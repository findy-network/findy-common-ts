import { ServiceError } from '@grpc/grpc-js';
import { AgentServiceClient } from '../idl/agent_grpc_pb';
import { PingMsg } from '../idl/agent_pb';

import log from '../log';
import { MetaProvider } from './metadata';

export interface Agent {
  ping: () => Promise<PingMsg>;
}

export default async (
  client: AgentServiceClient,
  { getMeta }: MetaProvider
): Promise<Agent> => {
  const callback = (
    resolve: (res: any) => void,
    reject: (err: any) => void
  ) => (err: ServiceError | null, res: any): void => {
    log.debug(
      `Ping response ${JSON.stringify(res)} ${
        err != null ? `, err ${JSON.stringify(err)}` : ''
      }`
    );
    if (err != null) {
      reject(err);
    } else {
      resolve(res);
    }
  };

  const ping = async (): Promise<PingMsg> => {
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.ping(
        new PingMsg(),
        meta,
        callback(resolve, reject)
        /* (err: ServiceError | null, res: PingMsg) => {
          log.debug(
            `Ping response ${JSON.stringify(res)} ${
              err != null ? `, err ${JSON.stringify(err)}` : ''
            }`
          );
          if (err != null) {
            reject(err);
          } else {
            resolve(res);
          }
        } */
      );
    });
  };

  return {
    ping
  };
};
