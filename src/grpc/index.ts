import fs from 'fs';
import { credentials, ChannelCredentials } from '@grpc/grpc-js';
import { AgentServiceClient } from '../idl/agent_grpc_pb';
import { ProtocolServiceClient } from '../idl/protocol_grpc_pb';

import { AgentClient, createAgentClient as agentClient } from './agent';
import {
  ProtocolClient,
  createProtocolClient as protocolClient
} from './protocol';
import { Acator } from '../acator';
import metaProvider from './metadata';

export type { AgentClient, ProtocolClient }

export interface ConnectionProps {
  certPath: string;
  verifyServerIdentity?: boolean; // this should be enabled on production
  serverAddress: string;
  serverPort: number;
}

export interface Connection {
  createAgentClient: () => Promise<AgentClient>;
  createProtocolClient: () => Promise<ProtocolClient>;
}

export const openGRPCConnection = async (
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
    const rootCert = certPath !== '' ? fs.readFileSync(`${certPath}/server/server.crt`) : null;
    const clientKeyPath = `${certPath}/client/client.key`
    const clientCertPath = `${certPath}/client/client.crt`
    const clientKey = fs.existsSync(clientKeyPath) ? fs.readFileSync(clientKeyPath) : null;
    const clientCert = fs.existsSync(clientCertPath) ? fs.readFileSync(clientCertPath) : null;
    const args: any[] = [rootCert, clientKey, clientCert];
    if (verifyServerIdentity != null && !verifyServerIdentity) {
      args.push({ checkServerIdentity: () => null });
    }
    return credentials.createSsl(...args);
  };

  // Note, a limitation in grpc-js:
  // "Currently, you cannot explicitly attach a single connection to clients for two different services.
  // However, if you create two clients with the same URL, credentials, and options (if any),
  // they should end up using the same underlying connection."
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
