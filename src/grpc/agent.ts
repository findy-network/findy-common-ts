import { ClientReadableStream, closeClient } from '@grpc/grpc-js';
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
  SchemaCreate,
  Schema,
  SchemaData,
  Question,
  AgentStatus,
  Notification
} from '../idl/agent_pb';
import { ProtocolID, ProtocolStatus } from '../idl/protocol_pb';

import log from '../log';
import { MetaProvider } from './metadata';
import { ProtocolClient } from './protocol';
import { unaryHandler } from './utils';

const timeoutSecs = process.env.FINDY_CTS_RETRY_TIMEOUT_SECS ?? '5';

export interface AgentClient {
  startListening: (
    handleStatus: (status?: ListenStatus, err?: Error) => void,
    options?: ListenOptions
  ) => Promise<ClientReadableStream<AgentStatus>>;
  startWaiting: (
    handleQuestion: (question?: Question, err?: Error) => void,
    options?: CallbackOptions
  ) => Promise<ClientReadableStream<Question>>;
  give: (msg: Answer) => Promise<ClientID>;
  createInvitation: (msg: InvitationBase) => Promise<Invitation>;
  ping: () => Promise<PingMsg>;
  createSchema: (msg: SchemaCreate) => Promise<Schema>;
  createCredDef: (msg: CredDefCreate) => Promise<CredDefData>;
  getSchema: (msg: Schema) => Promise<SchemaData>;
  getCredDef: (msg: CredDef) => Promise<CredDefData>;
  close: () => void;
}

export interface CallbackOptions {
  retryOnError: boolean;
  filterKeepalive: boolean;
}

const defaultCallbackOptions = {
  retryOnError: true,
  filterKeepalive: true
};

export interface ListenOptions extends CallbackOptions {
  autoRelease: boolean;
  autoProtocolStatus: boolean;
  protocolClient?: ProtocolClient;
}

const defaultListenOptions = {
  ...defaultCallbackOptions,
  autoRelease: false,
  autoProtocolStatus: false
};

export interface ListenStatus {
  agent: AgentStatus;
  protocol?: ProtocolStatus;
}

export const createAgentClient = async (
  client: AgentServiceClient,
  { getMeta, getClientId }: MetaProvider
): Promise<AgentClient> => {
  const protocolStatusHandler =
    (protocolClient: ProtocolClient, autoRelease: boolean) =>
    async (
      notification: Notification,
      handleStatus: (status: ProtocolStatus) => void
    ): Promise<void> => {
      const msg = new ProtocolID();
      msg.setId(notification.getProtocolid());
      msg.setTypeid(notification.getProtocolType());
      msg.setRole(notification.getRole());
      try {
        const protocolStatus = await protocolClient.status(msg);
        handleStatus(protocolStatus);
        if (autoRelease) {
          await protocolClient.release(msg);
          log.debug('Protocol released successfully');
        }
      } catch (err) {
        log.error(`Error handling protocol status ${JSON.stringify(err)}`);
      }
    };

  const agentStatusHandler = (
    handleStatus: (status?: ListenStatus, err?: Error) => void,
    options: ListenOptions
  ): ((status: AgentStatus) => void) => {
    const { autoProtocolStatus, protocolClient, filterKeepalive, autoRelease } =
      options;
    if (autoProtocolStatus && protocolClient == null) {
      throw new Error(
        'Set valid protocol client when using auto protocol status'
      );
    }

    const handleProtocolStatus =
      protocolClient != null
        ? protocolStatusHandler(protocolClient, autoRelease)
        : () => {};

    return (status: AgentStatus) => {
      log.debug(`Received status ${JSON.stringify(status.toObject())}`);
      const notification = status.getNotification() ?? new Notification();

      const filterMsg =
        filterKeepalive &&
        notification.getTypeid() === Notification.Type.KEEPALIVE;
      const fetchProtocolStatus =
        autoProtocolStatus &&
        notification.getTypeid() === Notification.Type.STATUS_UPDATE;

      if (!filterMsg) {
        if (fetchProtocolStatus && protocolClient != null) {
          // eslint-disable-next-line no-void
          void handleProtocolStatus(notification, (protocolStatus) =>
            handleStatus({ agent: status, protocol: protocolStatus })
          );
        } else if (!fetchProtocolStatus) {
          handleStatus({ agent: status });
        }
      }
    };
  };

  const startListening = async (
    sendStatus: (status?: ListenStatus, err?: Error) => void,
    options: ListenOptions = defaultListenOptions,
    retryCount: number = 0
  ): Promise<ClientReadableStream<AgentStatus>> => {
    const msg = getClientId();
    log.debug(`Agent: start listening ${JSON.stringify(msg.toObject())}`);

    const meta = await getMeta();
    const timeout = parseInt(timeoutSecs, 10) * 1000 * retryCount;
    let newCount = retryCount;
    const waitAndRetry = (): NodeJS.Timeout =>
      setTimeout(() => {
        // eslint-disable-next-line no-void
        void startListening(sendStatus, options, newCount + 1);
      }, timeout);

    const handleAgentStatus = agentStatusHandler(sendStatus, options);

    const stream = client.listen(msg, meta);

    stream.on('data', (status: AgentStatus) => {
      newCount = 0;
      handleAgentStatus(status);
    });

    stream.on('error', (err) => {
      log.error(`GRPC error when waiting ${JSON.stringify(err)}.`);
      if (!options.retryOnError) {
        sendStatus(undefined, err);
      }
      stream.cancel();
    });
    stream.on('end', () => {
      log.error(`Streaming ended when listening.`);
      stream.cancel();
      if (options.retryOnError) {
        log.error(`Retry listening...`);
        waitAndRetry();
      }
    });
    return stream;
  };

  const startWaiting = async (
    handleQuestion: (question?: Question, err?: Error) => void,
    options: CallbackOptions = defaultCallbackOptions,
    retryCount: number = 0
  ): Promise<ClientReadableStream<Question>> => {
    const msg = getClientId();
    log.debug(`Agent: start waiting ${JSON.stringify(msg.toObject())}`);

    const meta = await getMeta();
    const timeout = parseInt(timeoutSecs, 10) * 1000 * retryCount;
    const stream = client.wait(msg, meta);
    let newCount = retryCount;
    const waitAndRetry = (): NodeJS.Timeout =>
      setTimeout(() => {
        startWaiting(handleQuestion, options, newCount + 1).then(
          () => log.debug(`Waiting started after ${timeout}ms`),
          () => {}
        );
      }, timeout);

    stream.on('data', (question: Question) => {
      newCount = 0;
      log.debug(`Received question ${JSON.stringify(question.toObject())}`);

      const filterMsg =
        options.filterKeepalive &&
        question.getTypeid() === Question.Type.KEEPALIVE;

      if (!filterMsg) {
        handleQuestion(question);
      }
    });
    stream.on('error', (err) => {
      log.error(`GRPC error when waiting ${JSON.stringify(err)}.`);
      if (!options.retryOnError) {
        handleQuestion(undefined, err);
      }
      stream.cancel();
    });
    stream.on('end', () => {
      log.error(`Streaming ended when waiting.`);
      stream.cancel();
      if (options.retryOnError) {
        log.error(`Retry waiting...`);
        waitAndRetry();
      }
    });
    return stream;
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
    ping,
    createSchema,
    createCredDef,
    getSchema,
    getCredDef,
    close
  };
};
