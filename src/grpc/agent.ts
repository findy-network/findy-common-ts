import { ServiceError } from '@grpc/grpc-js';
import { AgentServiceClient } from '../idl/agent_grpc_pb';
import {
  Answer,
  ClientID,
  CredDef,
  CredDefData,
  CredDefCreate,
  Invitation,
  InvitationBase,
  PingMsg,
  SAImplementation,
  SchemaCreate,
  Schema,
  SchemaData
} from '../idl/agent_pb';

import log from '../log';
import { MetaProvider } from './metadata';

export interface Agent {
  // startListening(msg: ClientID, handler: () => void): Promise<ClientID>;
  // startWaiting(msg: ClientID, handler: () => void): Promise<ClientID>;
  give: (msg: Answer) => Promise<ClientID>;
  createInvitation: (msg: InvitationBase) => Promise<Invitation>;
  setImplId: (msg: SAImplementation) => Promise<SAImplementation>;
  ping: () => Promise<PingMsg>;
  createSchema: (msg: SchemaCreate) => Promise<Schema>;
  createCredDef: (msg: CredDefCreate) => Promise<CredDefData>;
  getSchema: (msg: Schema) => Promise<SchemaData>;
  getCredDef: (msg: CredDef) => Promise<CredDefData>;
}

export default async (
  client: AgentServiceClient,
  { getMeta }: MetaProvider
): Promise<Agent> => {
  const handler = (
    name: string,
    resolve: (res: any) => void,
    reject: (err: any) => void
  ) => (err: ServiceError | null, res: any): void => {
    log.debug(
      `${name} response ${JSON.stringify(res.toObject())} ${
        err != null ? `, err ${JSON.stringify(err)}` : ''
      }`
    );
    if (err != null) {
      log.error(`GRPC error ${JSON.stringify(err)}`);
      reject(err);
    } else {
      resolve(res);
    }
  };

  const give = async (msg: Answer): Promise<ClientID> => {
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.give(msg, meta, handler('give', resolve, reject));
    });
  };

  const createInvitation = async (msg: InvitationBase): Promise<Invitation> => {
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.createInvitation(
        msg,
        meta,
        handler('createInvitation', resolve, reject)
      );
    });
  };

  const setImplId = async (
    msg: SAImplementation
  ): Promise<SAImplementation> => {
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.setImplId(msg, meta, handler('setImplId', resolve, reject));
    });
  };

  const ping = async (msg: PingMsg = new PingMsg()): Promise<PingMsg> => {
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.ping(msg, meta, handler('ping', resolve, reject));
    });
  };

  const createSchema = async (msg: SchemaCreate): Promise<Schema> => {
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.createSchema(msg, meta, handler('createSchema', resolve, reject));
    });
  };

  const createCredDef = async (msg: CredDefCreate): Promise<CredDefData> => {
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.createCredDef(
        msg,
        meta,
        handler('createCredDef', resolve, reject)
      );
    });
  };

  const getSchema = async (msg: Schema): Promise<SchemaData> => {
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.getSchema(msg, meta, handler('getSchema', resolve, reject));
    });
  };

  const getCredDef = async (msg: CredDef): Promise<CredDefData> => {
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.getCredDef(msg, meta, handler('getCredDef', resolve, reject));
    });
  };

  return {
    give,
    createInvitation,
    setImplId,
    ping,
    createSchema,
    createCredDef,
    getSchema,
    getCredDef
  };
};
