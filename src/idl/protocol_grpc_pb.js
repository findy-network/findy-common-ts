// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2020 Harri @ OP Techlab.
//
//
'use strict';
var grpc = require('@grpc/grpc-js');
var protocol_pb = require('./protocol_pb.js');

function serialize_agency_v1_Protocol(arg) {
  if (!(arg instanceof protocol_pb.Protocol)) {
    throw new Error('Expected argument of type agency.v1.Protocol');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_v1_Protocol(buffer_arg) {
  return protocol_pb.Protocol.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_v1_ProtocolID(arg) {
  if (!(arg instanceof protocol_pb.ProtocolID)) {
    throw new Error('Expected argument of type agency.v1.ProtocolID');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_v1_ProtocolID(buffer_arg) {
  return protocol_pb.ProtocolID.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_v1_ProtocolState(arg) {
  if (!(arg instanceof protocol_pb.ProtocolState)) {
    throw new Error('Expected argument of type agency.v1.ProtocolState');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_v1_ProtocolState(buffer_arg) {
  return protocol_pb.ProtocolState.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_v1_ProtocolStatus(arg) {
  if (!(arg instanceof protocol_pb.ProtocolStatus)) {
    throw new Error('Expected argument of type agency.v1.ProtocolStatus');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_v1_ProtocolStatus(buffer_arg) {
  return protocol_pb.ProtocolStatus.deserializeBinary(new Uint8Array(buffer_arg));
}


//
// ProtocolService runs and monitors DIDComm protocols. The service handles
// protocols as a protocol state machines (PSM). The PSMs are optimized for
// performance and stability on high load. They are presistent and consume
// resources. Please remember to call Release after protocol is (totally) finalized
// i.e. as soon as it's Ready. If state machines aren't released by caller the
// agency will release them by force sooner or later.
var ProtocolServiceService = exports.ProtocolServiceService = {
  // Run is function to start a protocol and return a stream to listen to
// its progress.
run: {
    path: '/agency.v1.ProtocolService/Run',
    requestStream: false,
    responseStream: true,
    requestType: protocol_pb.Protocol,
    responseType: protocol_pb.ProtocolState,
    requestSerialize: serialize_agency_v1_Protocol,
    requestDeserialize: deserialize_agency_v1_Protocol,
    responseSerialize: serialize_agency_v1_ProtocolState,
    responseDeserialize: deserialize_agency_v1_ProtocolState,
  },
  // Start asks the agency to start a protocol. It immediately returns a
// protocol ID that allows to monitor the protocol with Status function.
// When Agent service's Listen is in use, we get notifications how protocol
// proceeds and when it's ready.
start: {
    path: '/agency.v1.ProtocolService/Start',
    requestStream: false,
    responseStream: false,
    requestType: protocol_pb.Protocol,
    responseType: protocol_pb.ProtocolID,
    requestSerialize: serialize_agency_v1_Protocol,
    requestDeserialize: deserialize_agency_v1_Protocol,
    responseSerialize: serialize_agency_v1_ProtocolID,
    responseDeserialize: deserialize_agency_v1_ProtocolID,
  },
  // Status returns a current ProtocolStatus which offers both typed data fields
// and combined JSON string.
status: {
    path: '/agency.v1.ProtocolService/Status',
    requestStream: false,
    responseStream: false,
    requestType: protocol_pb.ProtocolID,
    responseType: protocol_pb.ProtocolStatus,
    requestSerialize: serialize_agency_v1_ProtocolID,
    requestDeserialize: deserialize_agency_v1_ProtocolID,
    responseSerialize: serialize_agency_v1_ProtocolStatus,
    responseDeserialize: deserialize_agency_v1_ProtocolStatus,
  },
  // Resume tells the protocol state machine how to proceed when it's waiting
// user action e.g. permission to send response to proof request.
resume: {
    path: '/agency.v1.ProtocolService/Resume',
    requestStream: false,
    responseStream: false,
    requestType: protocol_pb.ProtocolState,
    responseType: protocol_pb.ProtocolID,
    requestSerialize: serialize_agency_v1_ProtocolState,
    requestDeserialize: deserialize_agency_v1_ProtocolState,
    responseSerialize: serialize_agency_v1_ProtocolID,
    responseDeserialize: deserialize_agency_v1_ProtocolID,
  },
  // Release releases the protocol state machine from agency. It can be called
// only when protocol is in Ready state. After release you can access the
// status information of your DIDComm with the others services of your system.
release: {
    path: '/agency.v1.ProtocolService/Release',
    requestStream: false,
    responseStream: false,
    requestType: protocol_pb.ProtocolID,
    responseType: protocol_pb.ProtocolID,
    requestSerialize: serialize_agency_v1_ProtocolID,
    requestDeserialize: deserialize_agency_v1_ProtocolID,
    responseSerialize: serialize_agency_v1_ProtocolID,
    responseDeserialize: deserialize_agency_v1_ProtocolID,
  },
};

exports.ProtocolServiceClient = grpc.makeGenericClientConstructor(ProtocolServiceService);
