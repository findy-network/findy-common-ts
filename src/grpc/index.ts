import fs from 'fs';
import { credentials, ChannelCredentials } from '@grpc/grpc-js';
import { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import { AgentServiceClient } from '../idl/agent_grpc_pb';

interface ConnectionProps {
  certPath: string;
  verifyServerIdentity: boolean; // this should be enabled on production
  serverAddress: string;
  serverPort: string;
}

export default ({
  certPath,
  verifyServerIdentity,
  serverAddress,
  serverPort
}: ConnectionProps): {
  createClient: (
    create: (url: string, creds: ChannelCredentials) => ServiceClient
  ) => Promise<ServiceClient>;
} => {
  const createClient = async (
    create: (url: string, creds: ChannelCredentials) => ServiceClient
  ): Promise<ServiceClient> => {
    const rootCert = fs.readFileSync(certPath);
    const args: any[] = [rootCert, null, null];
    if (verifyServerIdentity) {
      args.push({ checkServerIdentity: () => null });
    }
    const channelCreds = credentials.createSsl(...args);
    const newClient = create(`${serverAddress}:${serverPort}`, channelCreds);
    return newClient;
  };

  const createAgentClient = async () =>
    createClient((url, creds) => new AgentServiceClient(url, creds));

  return {
    createAgentClient
  };
};
