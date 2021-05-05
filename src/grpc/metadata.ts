import { Metadata } from '@grpc/grpc-js';
import { decode } from 'jsonwebtoken';

import log from '../log';
import { Acator } from '../acator';

export interface MetaProvider {
  getMeta: () => Promise<Metadata>;
}

export default async (renew: Acator): Promise<MetaProvider> => {
  const getToken = async (): Promise<string> => {
    return await renew.login();
  };

  let token = await getToken();

  const getMeta = async (): Promise<Metadata> => {
    const tokenData = decode(token) as { exp: number };
    if (tokenData == null) {
      log.error(`Invalid token, unable to parse: ${token}`);
      throw new Error('invalid token');
    }
    log.debug(`GRPC token expiry ${new Date(tokenData.exp * 1000).toString()}`);

    const msInSec = 1000;
    const diff = Math.abs(tokenData.exp * msInSec - new Date().getTime());
    if (diff < msInSec) {
      log.info('GRPC token expired, starting renewal...');
      token = await getToken();
    }

    const meta = new Metadata();
    meta.add('Authorization', `Bearer ${token}`);
    return meta;
  };

  return {
    getMeta
  };
};
