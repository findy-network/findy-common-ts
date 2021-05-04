import { closeClient } from '@grpc/grpc-js';
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
  SchemaData,
  Question,
  AgentStatus
} from '../idl/agent_pb';

import log from '../log';
import { MetaProvider } from './metadata';
import { unaryHandler } from './utils';

const timeoutSecs = process.env.FINDY_CTS_RETRY_TIMEOUT_SECS ?? '5';

export interface AgentClient {
  startListening: (
    msg: ClientID,
    handleStatus: (status: AgentStatus) => void
  ) => Promise<ClientID>;
  startWaiting: (
    msg: ClientID,
    handleQuestion: (question: Question) => void
  ) => Promise<ClientID>;
  give: (msg: Answer) => Promise<ClientID>;
  createInvitation: (msg: InvitationBase) => Promise<Invitation>;
  setImplId: (msg: SAImplementation) => Promise<SAImplementation>;
  ping: () => Promise<PingMsg>;
  createSchema: (msg: SchemaCreate) => Promise<Schema>;
  createCredDef: (msg: CredDefCreate) => Promise<CredDefData>;
  getSchema: (msg: Schema) => Promise<SchemaData>;
  getCredDef: (msg: CredDef) => Promise<CredDefData>;
  close: () => void;
}

export const createAgentClient = async (
  client: AgentServiceClient,
  { getMeta }: MetaProvider
): Promise<AgentClient> => {
  const startListening = async (
    msg: ClientID,
    handleStatus: (status: AgentStatus) => void,
    retryCount: number = 0
  ): Promise<ClientID> => {
    log.debug(`Agent: start listening ${JSON.stringify(msg.toObject())}`);
    const meta = await getMeta();
    const timeout = parseInt(timeoutSecs, 10) * 1000 * retryCount;
    return await new Promise((resolve) => {
      const stream = client.listen(msg, meta);
      let newCount = retryCount;
      const waitAndRetry = (): NodeJS.Timeout =>
        setTimeout(() => {
          startListening(msg, handleStatus, newCount + 1).then(
            () => log.debug('Listening started'),
            () => {}
          );
        }, timeout);

      stream.on('data', (status: AgentStatus) => {
        newCount = 0;
        handleStatus(status);
      });
      stream.on('error', (err) => {
        log.error(`GRPC error when waiting ${JSON.stringify(err)}.`);
        stream.cancel();
      });
      stream.on('end', () => {
        log.error(`Streaming ended when listening. Retry...`);
        stream.cancel();
        waitAndRetry();
      });
      resolve(msg);
    });
  };

  const startWaiting = async (
    msg: ClientID,
    handleQuestion: (question: Question) => void,
    retryCount: number = 0
  ): Promise<ClientID> => {
    log.debug(`Agent: start waiting ${JSON.stringify(msg.toObject())}`);
    const meta = await getMeta();
    const timeout = parseInt(timeoutSecs, 10) * 1000 * retryCount;
    return await new Promise((resolve) => {
      const stream = client.wait(msg, meta);
      let newCount = retryCount;
      const waitAndRetry = (): NodeJS.Timeout =>
        setTimeout(() => {
          startWaiting(msg, handleQuestion, newCount + 1).then(
            () => log.debug('Waiting started'),
            () => {}
          );
        }, timeout);

      stream.on('data', (question: Question) => {
        newCount = 0;
        handleQuestion(question);
      });
      stream.on('error', (err) => {
        log.error(`GRPC error when waiting ${JSON.stringify(err)}.`);
        stream.cancel();
      });
      stream.on('end', () => {
        log.error(`Streaming ended when waiting. Retry...`);
        stream.cancel();
        waitAndRetry();
      });
      resolve(msg);
    });
  };

  const give = async (msg: Answer): Promise<ClientID> => {
    log.debug(`Agent: give answer ${JSON.stringify(msg.toObject())}`);
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.give(msg, meta, unaryHandler('give', resolve, reject));
    });
  };

  const createInvitation = async (msg: InvitationBase): Promise<Invitation> => {
    log.debug(`Agent: create invitation ${JSON.stringify(msg.toObject())}`);
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.createInvitation(
        msg,
        meta,
        unaryHandler('createInvitation', resolve, reject)
      );
    });
  };

  const setImplId = async (
    msg: SAImplementation
  ): Promise<SAImplementation> => {
    log.debug(`Agent: set implementation ${JSON.stringify(msg.toObject())}`);
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.setImplId(msg, meta, unaryHandler('setImplId', resolve, reject));
    });
  };

  const ping = async (msg: PingMsg = new PingMsg()): Promise<PingMsg> => {
    log.debug(`Agent: ping ${JSON.stringify(msg.toObject())}`);
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.ping(msg, meta, unaryHandler('ping', resolve, reject));
    });
  };

  const createSchema = async (msg: SchemaCreate): Promise<Schema> => {
    log.debug(`Agent: create schema ${JSON.stringify(msg.toObject())}`);
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.createSchema(
        msg,
        meta,
        unaryHandler('createSchema', resolve, reject)
      );
    });
  };

  const createCredDef = async (msg: CredDefCreate): Promise<CredDefData> => {
    log.debug(`Agent: create cred def ${JSON.stringify(msg.toObject())}`);
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.createCredDef(
        msg,
        meta,
        unaryHandler('createCredDef', resolve, reject)
      );
    });
  };

  const getSchema = async (msg: Schema): Promise<SchemaData> => {
    log.debug(`Agent: get schema ${JSON.stringify(msg.toObject())}`);
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.getSchema(msg, meta, unaryHandler('getSchema', resolve, reject));
    });
  };

  const getCredDef = async (msg: CredDef): Promise<CredDefData> => {
    log.debug(`Agent: get cred def ${JSON.stringify(msg.toObject())}`);
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.getCredDef(msg, meta, unaryHandler('getCredDef', resolve, reject));
    });
  };

  const close = (): void => {
    log.debug(`Agent: close`);
    closeClient(client);
  };

  return {
    startListening,
    startWaiting,
    give,
    createInvitation,
    setImplId,
    ping,
    createSchema,
    createCredDef,
    getSchema,
    getCredDef,
    close
  };
};
