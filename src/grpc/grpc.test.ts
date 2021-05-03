import {
  InvitationBase,
  SAImplementation,
  SchemaCreate
} from '../idl/agent_pb';
import { Agent } from './agent';
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

let client: Agent;

beforeAll(async () => {
  stopMock();
  startMock();

  const connection = await grpc(props, acator);
  const { createAgentClient } = connection;
  client = await createAgentClient();
});
afterAll(stopMock);

describe('GRPC', () => {
  it('should open connection', async () => {
    expect(client).toBeDefined();

    const res = await client.ping();
    expect(res).toBeDefined();
  });
  it('should create invitation', async () => {
    const invitation = new InvitationBase();
    invitation.setExpiration(1);
    invitation.setId('id');
    invitation.setLabel('label');

    const res = await client.createInvitation(invitation);
    expect(res).toBeDefined();
    expect(res.getJson()).not.toEqual('');
    expect(res.getUrl()).not.toEqual('');
  });
  it('should set impl id', async () => {
    const msg = new SAImplementation();
    msg.setEndpoint('endpoint');
    msg.setId('id');
    msg.setKey('key');
    msg.setPersistent(true);

    const res = await client.setImplId(msg);
    expect(res).toBeDefined();
    expect(res.getEndpoint()).toEqual(msg.getEndpoint());
    expect(res.getId()).toEqual(msg.getId());
    expect(res.getKey()).toEqual(msg.getKey());
    expect(res.getPersistent()).toEqual(msg.getPersistent());
  });
  it('should create schema', async () => {
    const msg = new SchemaCreate();
    msg.setName('schema');
    msg.setVersion('1.0');
    msg.setAttributesList(['attr1']);

    const res = await client.createSchema(msg);
    expect(res).toBeDefined();
    expect(res.getId()).not.toEqual('');
  });
});
