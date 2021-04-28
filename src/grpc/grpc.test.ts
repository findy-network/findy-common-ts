import { ServerCredentials, Server, loadPackageDefinition } from 'grpc';
import { loadSync } from '@grpc/proto-loader';
import { readFileSync } from 'fs';

import grpc, { ConnectionProps } from './index';
import { PingMsg } from '../idl/agent_pb';

const port = 50053;

const props: ConnectionProps = {
  serverAddress: 'localhost',
  serverPort: port,
  certPath: './tools/config/server.crt',
  verifyServerIdentity: false
};

const connection = grpc(props);

const { start: startMock, stop: stopMock } = (() => {
  const server = new Server();
  const start = (): void => {
    const pubKey = readFileSync(props.certPath);
    const privKey = readFileSync('./tools/config/server.key');
    const creds = ServerCredentials.createSsl(null, [
      { private_key: privKey, cert_chain: pubKey }
    ]);

    const packageDefinition = loadSync('./idl/agent.proto');
    const agency = loadPackageDefinition(packageDefinition).agency as any;
    server.addService(agency.v1.AgentService.service, {
      Listen: () => {},
      Wait: () => {},
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
    const { createAgentClient } = connection;
    const client = await createAgentClient(props);
    expect(client).toBeDefined();

    const res = await client.ping();
    console.log(res);
  });
});
