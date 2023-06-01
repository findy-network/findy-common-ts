// package: agency.v1
// file: agent.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from '@grpc/grpc-js';
import * as agent_pb from './agent_pb';
import * as protocol_pb from './protocol_pb';

interface IAgentServiceService
  extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  listen: IAgentServiceService_IListen;
  wait: IAgentServiceService_IWait;
  give: IAgentServiceService_IGive;
  createInvitation: IAgentServiceService_ICreateInvitation;
  ping: IAgentServiceService_IPing;
  createSchema: IAgentServiceService_ICreateSchema;
  createCredDef: IAgentServiceService_ICreateCredDef;
  getSchema: IAgentServiceService_IGetSchema;
  getCredDef: IAgentServiceService_IGetCredDef;
  enter: IAgentServiceService_IEnter;
}

interface IAgentServiceService_IListen
  extends grpc.MethodDefinition<agent_pb.ClientID, agent_pb.AgentStatus> {
  path: '/agency.v1.AgentService/Listen';
  requestStream: false;
  responseStream: true;
  requestSerialize: grpc.serialize<agent_pb.ClientID>;
  requestDeserialize: grpc.deserialize<agent_pb.ClientID>;
  responseSerialize: grpc.serialize<agent_pb.AgentStatus>;
  responseDeserialize: grpc.deserialize<agent_pb.AgentStatus>;
}
interface IAgentServiceService_IWait
  extends grpc.MethodDefinition<agent_pb.ClientID, agent_pb.Question> {
  path: '/agency.v1.AgentService/Wait';
  requestStream: false;
  responseStream: true;
  requestSerialize: grpc.serialize<agent_pb.ClientID>;
  requestDeserialize: grpc.deserialize<agent_pb.ClientID>;
  responseSerialize: grpc.serialize<agent_pb.Question>;
  responseDeserialize: grpc.deserialize<agent_pb.Question>;
}
interface IAgentServiceService_IGive
  extends grpc.MethodDefinition<agent_pb.Answer, agent_pb.ClientID> {
  path: '/agency.v1.AgentService/Give';
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<agent_pb.Answer>;
  requestDeserialize: grpc.deserialize<agent_pb.Answer>;
  responseSerialize: grpc.serialize<agent_pb.ClientID>;
  responseDeserialize: grpc.deserialize<agent_pb.ClientID>;
}
interface IAgentServiceService_ICreateInvitation
  extends grpc.MethodDefinition<agent_pb.InvitationBase, agent_pb.Invitation> {
  path: '/agency.v1.AgentService/CreateInvitation';
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<agent_pb.InvitationBase>;
  requestDeserialize: grpc.deserialize<agent_pb.InvitationBase>;
  responseSerialize: grpc.serialize<agent_pb.Invitation>;
  responseDeserialize: grpc.deserialize<agent_pb.Invitation>;
}
interface IAgentServiceService_IPing
  extends grpc.MethodDefinition<agent_pb.PingMsg, agent_pb.PingMsg> {
  path: '/agency.v1.AgentService/Ping';
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<agent_pb.PingMsg>;
  requestDeserialize: grpc.deserialize<agent_pb.PingMsg>;
  responseSerialize: grpc.serialize<agent_pb.PingMsg>;
  responseDeserialize: grpc.deserialize<agent_pb.PingMsg>;
}
interface IAgentServiceService_ICreateSchema
  extends grpc.MethodDefinition<agent_pb.SchemaCreate, agent_pb.Schema> {
  path: '/agency.v1.AgentService/CreateSchema';
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<agent_pb.SchemaCreate>;
  requestDeserialize: grpc.deserialize<agent_pb.SchemaCreate>;
  responseSerialize: grpc.serialize<agent_pb.Schema>;
  responseDeserialize: grpc.deserialize<agent_pb.Schema>;
}
interface IAgentServiceService_ICreateCredDef
  extends grpc.MethodDefinition<agent_pb.CredDefCreate, agent_pb.CredDef> {
  path: '/agency.v1.AgentService/CreateCredDef';
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<agent_pb.CredDefCreate>;
  requestDeserialize: grpc.deserialize<agent_pb.CredDefCreate>;
  responseSerialize: grpc.serialize<agent_pb.CredDef>;
  responseDeserialize: grpc.deserialize<agent_pb.CredDef>;
}
interface IAgentServiceService_IGetSchema
  extends grpc.MethodDefinition<agent_pb.Schema, agent_pb.SchemaData> {
  path: '/agency.v1.AgentService/GetSchema';
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<agent_pb.Schema>;
  requestDeserialize: grpc.deserialize<agent_pb.Schema>;
  responseSerialize: grpc.serialize<agent_pb.SchemaData>;
  responseDeserialize: grpc.deserialize<agent_pb.SchemaData>;
}
interface IAgentServiceService_IGetCredDef
  extends grpc.MethodDefinition<agent_pb.CredDef, agent_pb.CredDefData> {
  path: '/agency.v1.AgentService/GetCredDef';
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<agent_pb.CredDef>;
  requestDeserialize: grpc.deserialize<agent_pb.CredDef>;
  responseSerialize: grpc.serialize<agent_pb.CredDefData>;
  responseDeserialize: grpc.deserialize<agent_pb.CredDefData>;
}
interface IAgentServiceService_IEnter
  extends grpc.MethodDefinition<agent_pb.ModeCmd, agent_pb.ModeCmd> {
  path: '/agency.v1.AgentService/Enter';
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<agent_pb.ModeCmd>;
  requestDeserialize: grpc.deserialize<agent_pb.ModeCmd>;
  responseSerialize: grpc.serialize<agent_pb.ModeCmd>;
  responseDeserialize: grpc.deserialize<agent_pb.ModeCmd>;
}

export const AgentServiceService: IAgentServiceService;

export interface IAgentServiceServer extends grpc.UntypedServiceImplementation {
  listen: grpc.handleServerStreamingCall<
    agent_pb.ClientID,
    agent_pb.AgentStatus
  >;
  wait: grpc.handleServerStreamingCall<agent_pb.ClientID, agent_pb.Question>;
  give: grpc.handleUnaryCall<agent_pb.Answer, agent_pb.ClientID>;
  createInvitation: grpc.handleUnaryCall<
    agent_pb.InvitationBase,
    agent_pb.Invitation
  >;
  ping: grpc.handleUnaryCall<agent_pb.PingMsg, agent_pb.PingMsg>;
  createSchema: grpc.handleUnaryCall<agent_pb.SchemaCreate, agent_pb.Schema>;
  createCredDef: grpc.handleUnaryCall<agent_pb.CredDefCreate, agent_pb.CredDef>;
  getSchema: grpc.handleUnaryCall<agent_pb.Schema, agent_pb.SchemaData>;
  getCredDef: grpc.handleUnaryCall<agent_pb.CredDef, agent_pb.CredDefData>;
  enter: grpc.handleUnaryCall<agent_pb.ModeCmd, agent_pb.ModeCmd>;
}

export interface IAgentServiceClient {
  listen(
    request: agent_pb.ClientID,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<agent_pb.AgentStatus>;
  listen(
    request: agent_pb.ClientID,
    metadata?: grpc.Metadata,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<agent_pb.AgentStatus>;
  wait(
    request: agent_pb.ClientID,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<agent_pb.Question>;
  wait(
    request: agent_pb.ClientID,
    metadata?: grpc.Metadata,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<agent_pb.Question>;
  give(
    request: agent_pb.Answer,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.ClientID
    ) => void
  ): grpc.ClientUnaryCall;
  give(
    request: agent_pb.Answer,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.ClientID
    ) => void
  ): grpc.ClientUnaryCall;
  give(
    request: agent_pb.Answer,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.ClientID
    ) => void
  ): grpc.ClientUnaryCall;
  createInvitation(
    request: agent_pb.InvitationBase,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.Invitation
    ) => void
  ): grpc.ClientUnaryCall;
  createInvitation(
    request: agent_pb.InvitationBase,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.Invitation
    ) => void
  ): grpc.ClientUnaryCall;
  createInvitation(
    request: agent_pb.InvitationBase,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.Invitation
    ) => void
  ): grpc.ClientUnaryCall;
  ping(
    request: agent_pb.PingMsg,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.PingMsg
    ) => void
  ): grpc.ClientUnaryCall;
  ping(
    request: agent_pb.PingMsg,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.PingMsg
    ) => void
  ): grpc.ClientUnaryCall;
  ping(
    request: agent_pb.PingMsg,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.PingMsg
    ) => void
  ): grpc.ClientUnaryCall;
  createSchema(
    request: agent_pb.SchemaCreate,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.Schema
    ) => void
  ): grpc.ClientUnaryCall;
  createSchema(
    request: agent_pb.SchemaCreate,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.Schema
    ) => void
  ): grpc.ClientUnaryCall;
  createSchema(
    request: agent_pb.SchemaCreate,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.Schema
    ) => void
  ): grpc.ClientUnaryCall;
  createCredDef(
    request: agent_pb.CredDefCreate,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.CredDef
    ) => void
  ): grpc.ClientUnaryCall;
  createCredDef(
    request: agent_pb.CredDefCreate,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.CredDef
    ) => void
  ): grpc.ClientUnaryCall;
  createCredDef(
    request: agent_pb.CredDefCreate,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.CredDef
    ) => void
  ): grpc.ClientUnaryCall;
  getSchema(
    request: agent_pb.Schema,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.SchemaData
    ) => void
  ): grpc.ClientUnaryCall;
  getSchema(
    request: agent_pb.Schema,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.SchemaData
    ) => void
  ): grpc.ClientUnaryCall;
  getSchema(
    request: agent_pb.Schema,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.SchemaData
    ) => void
  ): grpc.ClientUnaryCall;
  getCredDef(
    request: agent_pb.CredDef,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.CredDefData
    ) => void
  ): grpc.ClientUnaryCall;
  getCredDef(
    request: agent_pb.CredDef,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.CredDefData
    ) => void
  ): grpc.ClientUnaryCall;
  getCredDef(
    request: agent_pb.CredDef,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.CredDefData
    ) => void
  ): grpc.ClientUnaryCall;
  enter(
    request: agent_pb.ModeCmd,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.ModeCmd
    ) => void
  ): grpc.ClientUnaryCall;
  enter(
    request: agent_pb.ModeCmd,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.ModeCmd
    ) => void
  ): grpc.ClientUnaryCall;
  enter(
    request: agent_pb.ModeCmd,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.ModeCmd
    ) => void
  ): grpc.ClientUnaryCall;
}

export class AgentServiceClient
  extends grpc.Client
  implements IAgentServiceClient
{
  constructor(
    address: string,
    credentials: grpc.ChannelCredentials,
    options?: Partial<grpc.ClientOptions>
  );
  public listen(
    request: agent_pb.ClientID,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<agent_pb.AgentStatus>;
  public listen(
    request: agent_pb.ClientID,
    metadata?: grpc.Metadata,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<agent_pb.AgentStatus>;
  public wait(
    request: agent_pb.ClientID,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<agent_pb.Question>;
  public wait(
    request: agent_pb.ClientID,
    metadata?: grpc.Metadata,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<agent_pb.Question>;
  public give(
    request: agent_pb.Answer,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.ClientID
    ) => void
  ): grpc.ClientUnaryCall;
  public give(
    request: agent_pb.Answer,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.ClientID
    ) => void
  ): grpc.ClientUnaryCall;
  public give(
    request: agent_pb.Answer,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.ClientID
    ) => void
  ): grpc.ClientUnaryCall;
  public createInvitation(
    request: agent_pb.InvitationBase,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.Invitation
    ) => void
  ): grpc.ClientUnaryCall;
  public createInvitation(
    request: agent_pb.InvitationBase,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.Invitation
    ) => void
  ): grpc.ClientUnaryCall;
  public createInvitation(
    request: agent_pb.InvitationBase,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.Invitation
    ) => void
  ): grpc.ClientUnaryCall;
  public ping(
    request: agent_pb.PingMsg,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.PingMsg
    ) => void
  ): grpc.ClientUnaryCall;
  public ping(
    request: agent_pb.PingMsg,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.PingMsg
    ) => void
  ): grpc.ClientUnaryCall;
  public ping(
    request: agent_pb.PingMsg,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.PingMsg
    ) => void
  ): grpc.ClientUnaryCall;
  public createSchema(
    request: agent_pb.SchemaCreate,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.Schema
    ) => void
  ): grpc.ClientUnaryCall;
  public createSchema(
    request: agent_pb.SchemaCreate,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.Schema
    ) => void
  ): grpc.ClientUnaryCall;
  public createSchema(
    request: agent_pb.SchemaCreate,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.Schema
    ) => void
  ): grpc.ClientUnaryCall;
  public createCredDef(
    request: agent_pb.CredDefCreate,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.CredDef
    ) => void
  ): grpc.ClientUnaryCall;
  public createCredDef(
    request: agent_pb.CredDefCreate,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.CredDef
    ) => void
  ): grpc.ClientUnaryCall;
  public createCredDef(
    request: agent_pb.CredDefCreate,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.CredDef
    ) => void
  ): grpc.ClientUnaryCall;
  public getSchema(
    request: agent_pb.Schema,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.SchemaData
    ) => void
  ): grpc.ClientUnaryCall;
  public getSchema(
    request: agent_pb.Schema,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.SchemaData
    ) => void
  ): grpc.ClientUnaryCall;
  public getSchema(
    request: agent_pb.Schema,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.SchemaData
    ) => void
  ): grpc.ClientUnaryCall;
  public getCredDef(
    request: agent_pb.CredDef,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.CredDefData
    ) => void
  ): grpc.ClientUnaryCall;
  public getCredDef(
    request: agent_pb.CredDef,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.CredDefData
    ) => void
  ): grpc.ClientUnaryCall;
  public getCredDef(
    request: agent_pb.CredDef,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.CredDefData
    ) => void
  ): grpc.ClientUnaryCall;
  public enter(
    request: agent_pb.ModeCmd,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.ModeCmd
    ) => void
  ): grpc.ClientUnaryCall;
  public enter(
    request: agent_pb.ModeCmd,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.ModeCmd
    ) => void
  ): grpc.ClientUnaryCall;
  public enter(
    request: agent_pb.ModeCmd,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: agent_pb.ModeCmd
    ) => void
  ): grpc.ClientUnaryCall;
}
