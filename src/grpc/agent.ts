import { ServiceError } from 'grpc';
import { AgentServiceClient } from '../idl/agent_grpc_pb';
import { PingMsg } from '../idl/agent_pb';

import log from '../log';

export interface Agent {
  ping: () => Promise<PingMsg>;
}

export default async (client: AgentServiceClient): Promise<Agent> => {
  const ping = async (): Promise<PingMsg> =>
    await new Promise((resolve, reject) => {
      client.ping(new PingMsg(), (err: ServiceError | null, res: PingMsg) => {
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
      });
    });

  return {
    ping
  };
};
