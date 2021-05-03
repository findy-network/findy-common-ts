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
  PingMsg,
  Question,
  SAImplementation,
  Schema,
  SchemaCreate,
  SchemaData
} from '../idl/agent_pb';
import { AgentServiceService, IAgentServiceServer } from '../idl/agent_grpc_pb';
import { ConnectionProps } from './index';

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

class AgentServer implements IAgentServiceServer {
  [name: string]: UntypedHandleCall;

  async listen(
    call: ServerWritableStream<ClientID, AgentStatus>
  ): Promise<void> {
    const err = doAuth(call);

    // TODO
    if (err == null) {
      call.write(new AgentStatus());
    }
  }

  async wait(call: ServerWritableStream<ClientID, Question>): Promise<void> {
    const err = doAuth(call);

    // TODO
    if (err == null) {
      call.write(new Question());
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
