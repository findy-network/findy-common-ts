import fs from 'fs';
import { credentials, ChannelCredentials } from '@grpc/grpc-js';
import { AgentServiceClient } from '../idl/agent_grpc_pb';

import { ProtocolServiceClient } from '../idl/protocol_grpc_pb';
import agentClient, { Agent } from './agent';

export interface ConnectionProps {
  certPath: string;
  verifyServerIdentity: boolean; // this should be enabled on production
  serverAddress: string;
  serverPort: number;
}

export default ({
  certPath,
  verifyServerIdentity,
  serverAddress,
  serverPort
}: ConnectionProps): {
  createAgentClient: (props: ConnectionProps) => Promise<Agent>;
  createProtocolClient: (
    props: ConnectionProps
  ) => Promise<ProtocolServiceClient>;
} => {
  const getChannelCreds = (): ChannelCredentials => {
    const rootCert = fs.readFileSync(certPath);
    const args: any[] = [rootCert, null, null];
    if (verifyServerIdentity) {
      args.push({ checkServerIdentity: () => null });
    }
    return credentials.createSsl(...args);
  };

  /* const getMeta = async () => {
    const tokenData = decode(jwtToken);
    const msInSec = 1000;
    if (tokenData.exp * msInSec - new Date().getTime() < msInSec) {
      log.info('GRPC token expired, starting renewal...');
      jwtToken = await renewToken();
    }

    const meta = new Metadata();
    meta.add('Authorization', `Bearer ${jwtToken}`);
    return meta;
  }; */

  const createAgentClient = async (props: ConnectionProps): Promise<Agent> => {
    const creds = getChannelCreds();
    const client = new AgentServiceClient(
      `${serverAddress}:${serverPort}`,
      creds
    );
    return await agentClient(client);
  };

  const createProtocolClient = async (
    props: ConnectionProps
  ): Promise<ProtocolServiceClient> => {
    return new ProtocolServiceClient(
      `${serverAddress}:${serverPort}`,
      getChannelCreds()
    );
  };

  return {
    createAgentClient,
    createProtocolClient
  };
};
