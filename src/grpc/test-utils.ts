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
  const header = call.metadata.get('Authorization');
  if (
    header == null ||
    header === [] ||
    !(header[0] as string).startsWith('Bearer ')
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
    callback(err, err != null ? null : new ClientID());
  }

  createInvitation(
    call: ServerUnaryCall<InvitationBase, Invitation>,
    callback: sendUnaryData<Invitation>
  ): void {
    const err = doAuth(call);
    callback(err, err != null ? null : new Invitation());
  }

  setImplId(
    call: ServerUnaryCall<SAImplementation, SAImplementation>,
    callback: sendUnaryData<SAImplementation>
  ): void {
    const err = doAuth(call);
    callback(err, err != null ? null : new SAImplementation());
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
    callback(err, err != null ? null : new Schema());
  }

  createCredDef(
    call: ServerUnaryCall<CredDefCreate, CredDef>,
    callback: sendUnaryData<CredDef>
  ): void {
    const err = doAuth(call);
    callback(err, err != null ? null : new CredDef());
  }

  getSchema(
    call: ServerUnaryCall<Schema, SchemaData>,
    callback: sendUnaryData<SchemaData>
  ): void {
    const err = doAuth(call);
    callback(err, err != null ? null : new SchemaData());
  }

  getCredDef(
    call: ServerUnaryCall<CredDef, CredDefData>,
    callback: sendUnaryData<CredDefData>
  ): void {
    const err = doAuth(call);
    callback(err, err != null ? null : new CredDefData());
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

    server.bindAsync(`0.0.0.0:${props.serverPort}`, creds, () => {
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
