import { Metadata } from '@grpc/grpc-js';
import { decode } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import log from '../log';
import { Acator } from '../acator';
import { ClientID } from '../idl/agent_pb';

export interface MetaProvider {
  getClientId: () => ClientID;
  getMeta: () => Promise<Metadata>;
}

export default async (renew: Acator): Promise<MetaProvider> => {
  const getToken = async (): Promise<string> => {
    return await renew.login();
  };

  let token = await getToken();

  const clientUuid = uuidv4();

  const getClientId = (): ClientID => {
    const clientId = new ClientID();
    clientId.setId(clientUuid);
    return clientId;
  };

  const getMeta = async (): Promise<Metadata> => {
    const tokenData = decode(token) as { exp: number };
    const msInSec = 1000;
    const expiryTime = tokenData.exp * msInSec;
    if (tokenData == null) {
      log.error(`Invalid token, unable to parse: ${token}`);
      throw new Error('invalid token');
    }
    log.debug(`GRPC token expiry ${new Date(expiryTime).toString()}`);

    const diff = expiryTime - new Date().getTime();
    if (diff < msInSec) {
      log.info('GRPC token expired, starting renewal...');
      token = await getToken();
    }

    const meta = new Metadata();
    meta.add('Authorization', `Bearer ${token}`);
    return meta;
  };

  return {
    getClientId,
    getMeta
  };
};
