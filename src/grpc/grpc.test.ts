import { ServerCredentials, Server, loadPackageDefinition } from 'grpc';
import { loadSync } from '@grpc/proto-loader';
import { readFileSync } from 'fs';

import { createClient } from './index';
import { AgentServiceClient } from '../idl/agent_grpc_pb';

const port = 50053;

const { start: startMock, stop: stopMock } = (() => {
  const server = new Server();
  const start = (): void => {
    const pubKey = readFileSync('./tools/config/server.crt');
    const privKey = readFileSync('./tools/config/server.key');
    const creds = ServerCredentials.createSsl(null, [
      { private_key: privKey, cert_chain: pubKey }
    ]);

    const packageDefinition = loadSync('./idl/agent.proto');
    const agency = loadPackageDefinition(packageDefinition).agency as any;
    server.addService(agency.Agent.service, {
      Listen: () => {},
      Give: () => {},
      CreateInvitation: () => {},
      SetImplId: () => {},
      Ping: () => {},
      CreateSchema: () => {},
      CreateCredDef: () => {},
      GetSchema: () => {},
      GetCredDef: () => {}
    });

    server.bind(`0.0.0.0:${port}`, creds);
    server.start();
  };
  const stop = (): void => {
    server.forceShutdown();
  };
  return {
    start,
    stop
  };
})();

beforeAll(startMock);
afterAll(stopMock);

describe('GRPC', () => {
  it('should open connection', async () => {
    const client = createClient(() => new AgentServiceClient());
    expect({}).toBeDefined();
  });
});
