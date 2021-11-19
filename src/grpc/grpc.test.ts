import {
  ClientID,
  CredDef,
  CredDefCreate,
  InvitationBase,
  Notification,
  Schema,
  SchemaCreate
} from '../idl/agent_pb';
import { AgentClient, ListenStatus } from './agent';
import { ProtocolClient } from './protocol';
import { ConnectionProps, openGRPCConnection as grpc } from './index';
import testServer, { getToken } from './test-utils';
import { Protocol, ProtocolID, ProtocolState } from '../idl/protocol_pb';

const port = 50053;

const props: ConnectionProps = {
  serverAddress: 'localhost',
  serverPort: port,
  certPath: './tools/config/cert',
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
      const status = await new Promise<ListenStatus>((resolve, reject) => {
        agentClient
          .startListening((s?: ListenStatus) => {
            s != null ? resolve(s) : reject(new Error('error'));
          })
          .then(
            () => { },
            () => { }
          );
      });
      const res = status.agent.getNotification() ?? new Notification();
      expect(res).toBeDefined();
      const resClientId = status.agent.getClientid() ?? new ClientID();
      expect(resClientId.getId()).not.toEqual('');
    });
    it('should listen for status after error', async () => {
      const status = await new Promise<ListenStatus>((resolve, reject) => {
        agentClient
          .startListening((s?: ListenStatus) => {
            s != null ? resolve(s) : reject(new Error('error'));
          })
          .then(
            () => { },
            () => { }
          );
      });
      const res = status.agent.getNotification() ?? new Notification();
      expect(res).toBeDefined();
      const resClientId = status.agent.getClientid() ?? new ClientID();
      expect(resClientId.getId()).not.toEqual('');
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
    it('should send basic message', async () => {
      const msg = new Protocol.BasicMessageMsg();
      msg.setContent('content');

      const res = await protocolClient.sendBasicMessage('connectionId', msg);
      expect(res).toBeDefined();
      expect(res.getId()).not.toEqual('');
      expect(res.getRole()).not.toEqual('');
      expect(res.getTypeid()).not.toEqual('');
    });
    it('should send proof request', async () => {
      const attribute = new Protocol.Proof.Attribute();
      attribute.setCredDefid('credDefId');
      attribute.setName('name');
      const proof = new Protocol.Proof();
      proof.addAttributes(attribute);
      const msg = new Protocol.PresentProofMsg();
      msg.setAttributes(proof);

      const res = await protocolClient.sendProofRequest('connectionId', msg);
      expect(res).toBeDefined();
      expect(res.getId()).not.toEqual('');
      expect(res.getRole()).not.toEqual('');
      expect(res.getTypeid()).not.toEqual('');
    });
    it('should send credential offer', async () => {
      const attribute = new Protocol.IssuingAttributes.Attribute();
      attribute.setName('name');
      attribute.setValue('value');
      const offer = new Protocol.IssuingAttributes();
      offer.addAttributes(attribute);
      const msg = new Protocol.IssueCredentialMsg();
      msg.setAttributes(offer);

      const res = await protocolClient.sendCredentialOffer('connectionId', msg);
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
