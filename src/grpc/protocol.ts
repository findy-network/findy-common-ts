import { closeClient } from '@grpc/grpc-js';
import { ProtocolServiceClient } from '../idl/protocol_grpc_pb';
import {
  Protocol,
  ProtocolID,
  ProtocolState,
  ProtocolStatus
} from '../idl/protocol_pb';
import { MetaProvider } from './metadata';
import log from '../log';

import { unaryHandler } from './utils';

export interface ProtocolClient {
  // TODO: run
  start: (msg: Protocol) => Promise<ProtocolID>;
  status: (msg: ProtocolID) => Promise<ProtocolStatus>;
  resume: (msg: ProtocolState) => Promise<ProtocolID>;
  release: (msg: ProtocolID) => Promise<ProtocolID>;
  close: () => void;
}

export const createProtocolClient = async (
  client: ProtocolServiceClient,
  { getMeta }: MetaProvider
): Promise<ProtocolClient> => {
  const start = async (msg: Protocol): Promise<ProtocolID> => {
    log.debug(`Protocol: start ${JSON.stringify(msg.toObject())}`);
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.start(msg, meta, unaryHandler('start', resolve, reject));
    });
  };
  const status = async (msg: ProtocolID): Promise<ProtocolStatus> => {
    log.debug(`Protocol: status ${JSON.stringify(msg.toObject())}`);
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.status(msg, meta, unaryHandler('status', resolve, reject));
    });
  };
  const resume = async (msg: ProtocolState): Promise<ProtocolID> => {
    log.debug(`Protocol: resume ${JSON.stringify(msg.toObject())}`);
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.resume(msg, meta, unaryHandler('resume', resolve, reject));
    });
  };
  const release = async (msg: ProtocolID): Promise<ProtocolID> => {
    log.debug(`Protocol: release ${JSON.stringify(msg.toObject())}`);
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.release(msg, meta, unaryHandler('release', resolve, reject));
    });
  };
  const close = (): void => {
    log.debug(`Protocol: close`);
    closeClient(client);
  };

  return {
    start,
    status,
    resume,
    release,
    close
  };
};
