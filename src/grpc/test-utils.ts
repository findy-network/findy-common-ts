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
  ModeCmd,
  Notification,
  PingMsg,
  Question,
  Schema,
  SchemaCreate,
  SchemaData
} from '../idl/agent_pb';
import { AgentServiceService, IAgentServiceServer } from '../idl/agent_grpc_pb';
import { ConnectionProps } from './index';
import {
  Protocol,
  ProtocolID,
  ProtocolState,
  ProtocolStatus
} from '../idl/protocol_pb';
import {
  IProtocolServiceServer,
  ProtocolServiceService
} from '../idl/protocol_grpc_pb';

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
        call.end();
        listenErrorSent = true;
      } else {
        call.write(msg);
      }
    }
  }

  async wait(call: ServerWritableStream<ClientID, Question>): Promise<void> {}

  give(
    call: ServerUnaryCall<Answer, ClientID>,
    callback: sendUnaryData<ClientID>
  ): void {}

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

  enter(
    call: ServerUnaryCall<ModeCmd, ModeCmd>,
    callback: sendUnaryData<ModeCmd>
  ): void {
    const err = doAuth(call);
    const msg = new ModeCmd();
    msg.setAcceptMode(new ModeCmd.AcceptModeCmd());
    msg.setInfo('info');
    msg.setIsInput(true);
    msg.setTypeid(ModeCmd.CmdType.ACCEPT_MODE);
    callback(err, err != null ? null : msg);
  }
}

class ProtocolServer implements IProtocolServiceServer {
  [name: string]: UntypedHandleCall;
  run(call: ServerWritableStream<Protocol, ProtocolState>): void {
    doAuth(call);
    // TODO:
  }

  start(
    call: ServerUnaryCall<Protocol, ProtocolID>,
    callback: sendUnaryData<ProtocolID>
  ): void {
    const err = doAuth(call);
    const msg = new ProtocolID();
    msg.setId('id');
    msg.setNotificationTime(123);
    msg.setRole(Protocol.Role.INITIATOR);
    msg.setTypeid(Protocol.Type.PRESENT_PROOF);
    callback(err, err != null ? null : msg);
  }

  status(
    call: ServerUnaryCall<ProtocolID, ProtocolStatus>,
    callback: sendUnaryData<ProtocolStatus>
  ): void {
    const err = doAuth(call);
    const state = new ProtocolState();
    state.setInfo('info');
    state.setProtocolid(call.request);
    state.setState(ProtocolState.State.OK);
    const msg = new ProtocolStatus();
    msg.setTimestamp(123);
    msg.setState(state);
    callback(err, err != null ? null : msg);
  }

  resume(
    call: ServerUnaryCall<ProtocolState, ProtocolID>,
    callback: sendUnaryData<ProtocolID>
  ): void {
    const err = doAuth(call);
    callback(err, err != null ? null : call.request.getProtocolid());
  }

  release(
    call: ServerUnaryCall<ProtocolID, ProtocolID>,
    callback: sendUnaryData<ProtocolID>
  ): void {
    const err = doAuth(call);
    callback(err, err != null ? null : call.request);
  }
}

export default (
  props: ConnectionProps
): { start: () => void; stop: () => void } => {
  const server = new Server();
  const start = (): void => {
    const pubKey = readFileSync(`${props.certPath}/server/server.crt`);
    const privKey = readFileSync(`${props.certPath}/server/server.key`);
    const creds = ServerCredentials.createSsl(null, [
      { private_key: privKey, cert_chain: pubKey }
    ]);

    server.addService(AgentServiceService, new AgentServer());
    server.addService(ProtocolServiceService, new ProtocolServer());

    server.bindAsync(`0.0.0.0:${props.serverPort}`, creds, (err) => {
      if (err != null) {
        throw err;
      }
      server.start();
    });
  };
  const stop = async (): Promise<void> => {
    return await new Promise((resolve) => {
      server.tryShutdown(() => {
        setTimeout(resolve, 6000);
      });
      server.forceShutdown();
    });
  };
  return {
    start,
    stop
  };
};
