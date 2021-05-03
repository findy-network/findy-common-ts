import grpc, { ConnectionProps } from './index';
import testServer, { getToken } from './test-utils';

const port = 50052;

const props: ConnectionProps = {
  serverAddress: 'localhost',
  serverPort: port,
  certPath: './tools/config/server.crt',
  verifyServerIdentity: false
};

const acator = {
  login: async () => await Promise.resolve(getToken('0s'))
};

const { start: startMock, stop: stopMock } = testServer(props);

beforeAll(startMock);
afterAll(stopMock);

describe('GRPC', () => {
  it('should open connection', async () => {
    const connection = await grpc(props, acator);
    const { createAgentClient } = connection;
    const client = await createAgentClient();
    expect(client).toBeDefined();

    const res = await client.ping();
    expect(res).toBeDefined();
  });
});
