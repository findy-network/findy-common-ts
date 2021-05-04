import {
  ServerCredentials,
  Server,
  ServerUnaryCall,
  ServerWritableStream,
  sendUnaryData,
  UntypedHandleCall
} from '@grpc/grpc-js';
import { readFileSync } from 'fs';
import { sign } from 'jsonwebtoken';

import {
  AgentStatus,
  Answer,
  ClientID,
  CredDef,
  CredDefCreate,
  CredDefData,
  Invitation,
  InvitationBase,
  Notification,
  PingMsg,
  Question,
  SAImplementation,
  Schema,
  SchemaCreate,
  SchemaData
} from '../idl/agent_pb';
import { AgentServiceService, IAgentServiceServer } from '../idl/agent_grpc_pb';
import { ConnectionProps } from './index';
import { Protocol } from '../idl/protocol_pb';

export const getToken = (expiresIn: string): string => {
  return sign({ un: 'minnie' }, 'whatever', { expiresIn });
};

const doAuth = (call: ServerUnaryCall<any, any>): Error | null => {
  const header = call.metadata.get('Authorization')[0] as string;
  const prefix = 'Bearer ';
  if (
    header == null ||
    !header.startsWith(prefix) ||
    header.length < prefix.length + 1
  ) {
    return new Error('Unauthorized');
  }
  return null;
};

let listenErrorSent = false;
let waitErrorSent = false;

const getStatus = (clientId: ClientID): AgentStatus => {
  const notification = new Notification();
  notification.setConnectionid('connectionId');
  notification.setId('id');
  notification.setPid('pid');
  notification.setProtocolFamily('family');
  notification.setProtocolType(Protocol.Type.PRESENT_PROOF);
  notification.setProtocolid('protocolId');
  notification.setRole(Protocol.Role.INITIATOR);
  notification.setTimestamp(123);
  notification.setTypeid(Notification.Type.PROTOCOL_PAUSED);

  const status = new AgentStatus();
  status.setClientid(clientId);
  status.setNotification(notification);

  return status;
};

class AgentServer implements IAgentServiceServer {
  [name: string]: UntypedHandleCall;

  async listen(
    call: ServerWritableStream<ClientID, AgentStatus>
  ): Promise<void> {
    const err = doAuth(call);

    const msg = getStatus(call.request);

    if (err == null) {
      if (call.request.getId().startsWith('error') && !listenErrorSent) {
        const err = new Error('error');
        call.emit('error', err);
        listenErrorSent = true;
      } else {
        call.write(msg);
      }
    }
  }

  async wait(call: ServerWritableStream<ClientID, Question>): Promise<void> {
    const err = doAuth(call);

    const status = getStatus(call.request);

    const attr = new Question.ProofVerifyMsg.Attribute();
    attr.setCredDefid('credDefId');
    attr.setName('name');
    attr.setValue('value');

    const question = new Question.ProofVerifyMsg();
    question.setAttributesList([attr]);

    const msg = new Question();
    msg.setTypeid(Question.Type.PROOF_VERIFY_WAITS);
    msg.setStatus(status);
    msg.setProofVerify(question);

    if (err == null) {
      if (call.request.getId().startsWith('error') && !waitErrorSent) {
        const err = new Error('error');
        call.emit('error', err);
        waitErrorSent = true;
      } else {
        call.write(msg);
      }
    }
  }

  give(
    call: ServerUnaryCall<Answer, ClientID>,
    callback: sendUnaryData<ClientID>
  ): void {
    const err = doAuth(call);
    const msg = new ClientID();
    msg.setId('id');
    callback(err, err != null ? null : msg);
  }

  createInvitation(
    call: ServerUnaryCall<InvitationBase, Invitation>,
    callback: sendUnaryData<Invitation>
  ): void {
    const err = doAuth(call);
    const invitation = new Invitation();
    invitation.setJson('json');
    invitation.setUrl('url');
    callback(err, err != null ? null : invitation);
  }

  setImplId(
    call: ServerUnaryCall<SAImplementation, SAImplementation>,
    callback: sendUnaryData<SAImplementation>
  ): void {
    const err = doAuth(call);
    const msg = new SAImplementation();
    msg.setEndpoint(call.request.getEndpoint());
    msg.setId(call.request.getId());
    msg.setKey(call.request.getKey());
    msg.setPersistent(call.request.getPersistent());
    callback(err, err != null ? null : msg);
  }

  ping(
    call: ServerUnaryCall<PingMsg, PingMsg>,
    callback: sendUnaryData<PingMsg>
  ): void {
    const err = doAuth(call);
    callback(err, err != null ? null : new PingMsg());
  }

  createSchema(
    call: ServerUnaryCall<SchemaCreate, Schema>,
    callback: sendUnaryData<Schema>
  ): void {
    const err = doAuth(call);
    const msg = new Schema();
    msg.setId('id');
    callback(err, err != null ? null : msg);
  }

  createCredDef(
    call: ServerUnaryCall<CredDefCreate, CredDef>,
    callback: sendUnaryData<CredDef>
  ): void {
    const err = doAuth(call);
    const msg = new CredDef();
    msg.setId('id');
    callback(err, err != null ? null : msg);
  }

  getSchema(
    call: ServerUnaryCall<Schema, SchemaData>,
    callback: sendUnaryData<SchemaData>
  ): void {
    const err = doAuth(call);
    const msg = new SchemaData();
    msg.setId('id');
    msg.setData('data');
    callback(err, err != null ? null : msg);
  }

  getCredDef(
    call: ServerUnaryCall<CredDef, CredDefData>,
    callback: sendUnaryData<CredDefData>
  ): void {
    const err = doAuth(call);
    const msg = new CredDefData();
    msg.setId('id');
    msg.setData('data');
    callback(err, err != null ? null : msg);
  }
}

export default (
  props: ConnectionProps
): { start: () => void; stop: () => void } => {
  const server = new Server();
  const start = (): void => {
    const pubKey = readFileSync(props.certPath);
    const privKey = readFileSync('./tools/config/server.key');
    const creds = ServerCredentials.createSsl(null, [
      { private_key: privKey, cert_chain: pubKey }
    ]);

    server.addService(AgentServiceService, new AgentServer());

    server.bindAsync(`0.0.0.0:${props.serverPort}`, creds, (err) => {
      if (err != null) {
        throw err;
      }
      server.start();
    });
  };
  const stop = (): void => {
    server.forceShutdown();
  };
  return {
    start,
    stop
  };
};
