import fs from 'fs';
import { credentials, ChannelCredentials } from '@grpc/grpc-js';
import { AgentServiceClient } from '../idl/agent_grpc_pb';

import agentClient, { Agent } from './agent';
import { Acator } from '../acator';
import metaProvider from './metadata';

export interface ConnectionProps {
  certPath: string;
  verifyServerIdentity: boolean; // this should be enabled on production
  serverAddress: string;
  serverPort: number;
}

export interface Connection {
  createAgentClient: () => Promise<Agent>;
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
    if (verifyServerIdentity) {
      args.push({ checkServerIdentity: () => null });
    }
    return credentials.createSsl(...args);
  };

  const createAgentClient = async (): Promise<Agent> => {
    const creds = getChannelCreds();
    const client = new AgentServiceClient(
      `${serverAddress}:${serverPort}`,
      creds
    );
    return await agentClient(client, meta);
  };

  return {
    createAgentClient
  };
};
