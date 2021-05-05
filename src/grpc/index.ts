import fs from 'fs';
import { credentials, ChannelCredentials } from '@grpc/grpc-js';
import { AgentServiceClient } from '../idl/agent_grpc_pb';
import { ProtocolServiceClient } from '../idl/protocol_grpc_pb';

import agentClient, { AgentClient } from './agent';
import protocolClient, { ProtocolClient } from './protocol';
import { Acator } from '../acator';
import metaProvider from './metadata';

export interface ConnectionProps {
  certPath: string;
  verifyServerIdentity: boolean; // this should be enabled on production
  serverAddress: string;
  serverPort: number;
}

export interface Connection {
  createAgentClient: () => Promise<AgentClient>;
  createProtocolClient: () => Promise<ProtocolClient>;
}

export default async (
  {
    certPath,
    verifyServerIdentity,
    serverAddress,
    serverPort
  }: ConnectionProps,
  acator: Acator
): Promise<Connection> => {
  const meta = await metaProvider(acator);

  const getChannelCreds = (): ChannelCredentials => {
    const rootCert = fs.readFileSync(certPath);
    const args: any[] = [rootCert, null, null];
    if (!verifyServerIdentity) {
      args.push({ checkServerIdentity: () => null });
    }
    return credentials.createSsl(...args);
  };

  const createAgentClient = async (): Promise<AgentClient> => {
    const creds = getChannelCreds();
    const client = new AgentServiceClient(
      `${serverAddress}:${serverPort}`,
      creds
    );
    return await agentClient(client, meta);
  };

  const createProtocolClient = async (): Promise<ProtocolClient> => {
    const creds = getChannelCreds();
    const client = new ProtocolServiceClient(
      `${serverAddress}:${serverPort}`,
      creds
    );
    return await protocolClient(client, meta);
  };

  return {
    createAgentClient,
    createProtocolClient
  };
};
