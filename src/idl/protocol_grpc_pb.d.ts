// package: agency.v1
// file: protocol.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as protocol_pb from "./protocol_pb";

interface IProtocolServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    run: IProtocolServiceService_IRun;
    start: IProtocolServiceService_IStart;
    status: IProtocolServiceService_IStatus;
    resume: IProtocolServiceService_IResume;
    release: IProtocolServiceService_IRelease;
}

interface IProtocolServiceService_IRun extends grpc.MethodDefinition<protocol_pb.Protocol, protocol_pb.ProtocolState> {
    path: "/agency.v1.ProtocolService/Run";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<protocol_pb.Protocol>;
    requestDeserialize: grpc.deserialize<protocol_pb.Protocol>;
    responseSerialize: grpc.serialize<protocol_pb.ProtocolState>;
    responseDeserialize: grpc.deserialize<protocol_pb.ProtocolState>;
}
interface IProtocolServiceService_IStart extends grpc.MethodDefinition<protocol_pb.Protocol, protocol_pb.ProtocolID> {
    path: "/agency.v1.ProtocolService/Start";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<protocol_pb.Protocol>;
    requestDeserialize: grpc.deserialize<protocol_pb.Protocol>;
    responseSerialize: grpc.serialize<protocol_pb.ProtocolID>;
    responseDeserialize: grpc.deserialize<protocol_pb.ProtocolID>;
}
interface IProtocolServiceService_IStatus extends grpc.MethodDefinition<protocol_pb.ProtocolID, protocol_pb.ProtocolStatus> {
    path: "/agency.v1.ProtocolService/Status";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<protocol_pb.ProtocolID>;
    requestDeserialize: grpc.deserialize<protocol_pb.ProtocolID>;
    responseSerialize: grpc.serialize<protocol_pb.ProtocolStatus>;
    responseDeserialize: grpc.deserialize<protocol_pb.ProtocolStatus>;
}
interface IProtocolServiceService_IResume extends grpc.MethodDefinition<protocol_pb.ProtocolState, protocol_pb.ProtocolID> {
    path: "/agency.v1.ProtocolService/Resume";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<protocol_pb.ProtocolState>;
    requestDeserialize: grpc.deserialize<protocol_pb.ProtocolState>;
    responseSerialize: grpc.serialize<protocol_pb.ProtocolID>;
    responseDeserialize: grpc.deserialize<protocol_pb.ProtocolID>;
}
interface IProtocolServiceService_IRelease extends grpc.MethodDefinition<protocol_pb.ProtocolID, protocol_pb.ProtocolID> {
    path: "/agency.v1.ProtocolService/Release";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<protocol_pb.ProtocolID>;
    requestDeserialize: grpc.deserialize<protocol_pb.ProtocolID>;
    responseSerialize: grpc.serialize<protocol_pb.ProtocolID>;
    responseDeserialize: grpc.deserialize<protocol_pb.ProtocolID>;
}

export const ProtocolServiceService: IProtocolServiceService;

export interface IProtocolServiceServer extends grpc.UntypedServiceImplementation {
    run: grpc.handleServerStreamingCall<protocol_pb.Protocol, protocol_pb.ProtocolState>;
    start: grpc.handleUnaryCall<protocol_pb.Protocol, protocol_pb.ProtocolID>;
    status: grpc.handleUnaryCall<protocol_pb.ProtocolID, protocol_pb.ProtocolStatus>;
    resume: grpc.handleUnaryCall<protocol_pb.ProtocolState, protocol_pb.ProtocolID>;
    release: grpc.handleUnaryCall<protocol_pb.ProtocolID, protocol_pb.ProtocolID>;
}

export interface IProtocolServiceClient {
    run(request: protocol_pb.Protocol, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<protocol_pb.ProtocolState>;
    run(request: protocol_pb.Protocol, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<protocol_pb.ProtocolState>;
    start(request: protocol_pb.Protocol, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolID) => void): grpc.ClientUnaryCall;
    start(request: protocol_pb.Protocol, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolID) => void): grpc.ClientUnaryCall;
    start(request: protocol_pb.Protocol, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolID) => void): grpc.ClientUnaryCall;
    status(request: protocol_pb.ProtocolID, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolStatus) => void): grpc.ClientUnaryCall;
    status(request: protocol_pb.ProtocolID, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolStatus) => void): grpc.ClientUnaryCall;
    status(request: protocol_pb.ProtocolID, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolStatus) => void): grpc.ClientUnaryCall;
    resume(request: protocol_pb.ProtocolState, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolID) => void): grpc.ClientUnaryCall;
    resume(request: protocol_pb.ProtocolState, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolID) => void): grpc.ClientUnaryCall;
    resume(request: protocol_pb.ProtocolState, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolID) => void): grpc.ClientUnaryCall;
    release(request: protocol_pb.ProtocolID, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolID) => void): grpc.ClientUnaryCall;
    release(request: protocol_pb.ProtocolID, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolID) => void): grpc.ClientUnaryCall;
    release(request: protocol_pb.ProtocolID, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolID) => void): grpc.ClientUnaryCall;
}

export class ProtocolServiceClient extends grpc.Client implements IProtocolServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public run(request: protocol_pb.Protocol, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<protocol_pb.ProtocolState>;
    public run(request: protocol_pb.Protocol, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<protocol_pb.ProtocolState>;
    public start(request: protocol_pb.Protocol, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolID) => void): grpc.ClientUnaryCall;
    public start(request: protocol_pb.Protocol, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolID) => void): grpc.ClientUnaryCall;
    public start(request: protocol_pb.Protocol, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolID) => void): grpc.ClientUnaryCall;
    public status(request: protocol_pb.ProtocolID, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolStatus) => void): grpc.ClientUnaryCall;
    public status(request: protocol_pb.ProtocolID, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolStatus) => void): grpc.ClientUnaryCall;
    public status(request: protocol_pb.ProtocolID, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolStatus) => void): grpc.ClientUnaryCall;
    public resume(request: protocol_pb.ProtocolState, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolID) => void): grpc.ClientUnaryCall;
    public resume(request: protocol_pb.ProtocolState, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolID) => void): grpc.ClientUnaryCall;
    public resume(request: protocol_pb.ProtocolState, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolID) => void): grpc.ClientUnaryCall;
    public release(request: protocol_pb.ProtocolID, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolID) => void): grpc.ClientUnaryCall;
    public release(request: protocol_pb.ProtocolID, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolID) => void): grpc.ClientUnaryCall;
    public release(request: protocol_pb.ProtocolID, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protocol_pb.ProtocolID) => void): grpc.ClientUnaryCall;
}
