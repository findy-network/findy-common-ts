import {
  AgentStatus,
  Answer,
  ClientID,
  CredDef,
  CredDefCreate,
  InvitationBase,
  Notification,
  Question,
  SAImplementation,
  Schema,
  SchemaCreate
} from '../idl/agent_pb';
import { AgentClient } from './agent';
import { ProtocolClient } from './protocol';
import grpc, { ConnectionProps } from './index';
import testServer, { getToken } from './test-utils';
import { Protocol, ProtocolID, ProtocolState } from '../idl/protocol_pb';

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

let agentClient: AgentClient;
let protocolClient: ProtocolClient;

describe('GRPC', () => {
  beforeAll(async () => {
    startMock();

    const connection = await grpc(props, acator);
    const { createAgentClient, createProtocolClient } = connection;
    agentClient = await createAgentClient();
    protocolClient = await createProtocolClient();
  });

  describe('Agent', () => {
    it('should open connection', async () => {
      expect(agentClient).toBeDefined();

      const res = await agentClient.ping();
      expect(res).toBeDefined();
    });
    it('should listen for status', async () => {
      const clientID = new ClientID();
      clientID.setId('id');

      const status = await new Promise<AgentStatus>((resolve) => {
        agentClient
          .startListening(clientID, (s: AgentStatus) => {
            resolve(s);
          })
          .then(
            () => {},
            () => {}
          );
      });
      const res = status.getNotification() ?? new Notification();
      expect(res).toBeDefined();
      const resClientId = status.getClientid() ?? new ClientID();
      expect(resClientId.getId()).toEqual(clientID.getId());
    });
    it('should wait for questions', async () => {
      const clientID = new ClientID();
      clientID.setId('id');

      const question = await new Promise<Question>((resolve) => {
        agentClient
          .startWaiting(clientID, (q: Question) => {
            resolve(q);
          })
          .then(
            () => {},
            () => {}
          );
      });
      const res = question.getStatus() ?? new AgentStatus();
      expect(res).toBeDefined();
      const resClientId = res.getClientid() ?? new ClientID();
      expect(resClientId.getId()).toEqual(clientID.getId());
    });
    it('should give answer', async () => {
      const clientID = new ClientID();
      clientID.setId('id');
      const msg = new Answer();
      msg.setId('id');
      msg.setAck(true);
      msg.setClientid(clientID);
      msg.setInfo('info');

      const res = await agentClient.give(msg);
      expect(res).toBeDefined();
      expect(res.getId()).not.toEqual('');
    });
    it('should create invitation', async () => {
      const invitation = new InvitationBase();
      invitation.setExpiration(1);
      invitation.setId('id');
      invitation.setLabel('label');

      const res = await agentClient.createInvitation(invitation);
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

      const res = await agentClient.setImplId(msg);
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

      const res = await agentClient.createSchema(msg);
      expect(res).toBeDefined();
      expect(res.getId()).not.toEqual('');
    });
    it('should create cred def', async () => {
      const msg = new CredDefCreate();
      msg.setSchemaid('id');
      msg.setTag('tag');

      const res = await agentClient.createCredDef(msg);
      expect(res).toBeDefined();
      expect(res.getId()).not.toEqual('');
    });
    it('should get schema', async () => {
      const msg = new Schema();
      msg.setId('id');

      const res = await agentClient.getSchema(msg);
      expect(res).toBeDefined();
      expect(res.getId()).not.toEqual('');
      expect(res.getData()).not.toEqual('');
    });
    it('should get cred def', async () => {
      const msg = new CredDef();
      msg.setId('id');

      const res = await agentClient.getCredDef(msg);
      expect(res).toBeDefined();
      expect(res.getId()).not.toEqual('');
      expect(res.getData()).not.toEqual('');
    });
  });
  describe('Protocol', () => {
    it('should start protocol', async () => {
      const msg = new Protocol.BasicMessageMsg();
      msg.setContent('content');

      const protocol = new Protocol();
      protocol.setTypeid(Protocol.Type.BASIC_MESSAGE);
      protocol.setRole(Protocol.Role.INITIATOR);
      protocol.setBasicMessage(msg);

      const res = await protocolClient.start(protocol);
      expect(res).toBeDefined();
      expect(res.getId()).not.toEqual('');
      expect(res.getRole()).not.toEqual('');
      expect(res.getTypeid()).not.toEqual('');
    });
    it('should fetch protocol status', async () => {
      const protocol = new ProtocolID();
      protocol.setTypeid(Protocol.Type.BASIC_MESSAGE);
      protocol.setRole(Protocol.Role.INITIATOR);
      protocol.setId('id');

      const res = await protocolClient.status(protocol);
      const status = res.getState() ?? new ProtocolState();
      expect(res).toBeDefined();
      expect(status.getProtocolid()).toEqual(protocol);
    });
    it('should resume protocol', async () => {
      const protocol = new ProtocolID();
      protocol.setTypeid(Protocol.Type.PRESENT_PROOF);
      protocol.setRole(Protocol.Role.RESUMER);
      protocol.setId('id');

      const msg = new ProtocolState();
      msg.setProtocolid(protocol);

      const res = await protocolClient.resume(msg);
      expect(res).toEqual(protocol);
    });
    it('should release protocol', async () => {
      const protocol = new ProtocolID();
      protocol.setTypeid(Protocol.Type.PRESENT_PROOF);
      protocol.setRole(Protocol.Role.RESUMER);
      protocol.setId('id');

      const res = await protocolClient.release(protocol);
      expect(res).toEqual(protocol);
    });
  });
  afterAll(async () => {
    agentClient.close();
    protocolClient.close();
    await stopMock();
  });
});
