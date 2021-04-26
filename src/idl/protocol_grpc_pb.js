// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2020 Harri @ OP Techlab.
//
//
'use strict';
var grpc = require('@grpc/grpc-js');
var protocol_pb = require('./protocol_pb.js');

function serialize_agency_Protocol(arg) {
  if (!(arg instanceof protocol_pb.Protocol)) {
    throw new Error('Expected argument of type agency.Protocol');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_Protocol(buffer_arg) {
  return protocol_pb.Protocol.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_ProtocolID(arg) {
  if (!(arg instanceof protocol_pb.ProtocolID)) {
    throw new Error('Expected argument of type agency.ProtocolID');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_ProtocolID(buffer_arg) {
  return protocol_pb.ProtocolID.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_ProtocolState(arg) {
  if (!(arg instanceof protocol_pb.ProtocolState)) {
    throw new Error('Expected argument of type agency.ProtocolState');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_ProtocolState(buffer_arg) {
  return protocol_pb.ProtocolState.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_ProtocolStatus(arg) {
  if (!(arg instanceof protocol_pb.ProtocolStatus)) {
    throw new Error('Expected argument of type agency.ProtocolStatus');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_ProtocolStatus(buffer_arg) {
  return protocol_pb.ProtocolStatus.deserializeBinary(new Uint8Array(buffer_arg));
}


//
// DIDComm is service to run and monitor DIDComm protocols. The findy agency
// handles protocols as state machines. The protocol state machines are optimized
// for performance and stability on high load. Please remember to call Release
// after protocol is finalized. If state machines aren't released by caller the
// agency will release them by force sooner or later.
var DIDCommService = exports.DIDCommService = {
  // Run is async function to start a protocol and return a stream to listen to
// its progress.
run: {
    path: '/agency.DIDComm/Run',
    requestStream: false,
    responseStream: true,
    requestType: protocol_pb.Protocol,
    responseType: protocol_pb.ProtocolState,
    requestSerialize: serialize_agency_Protocol,
    requestDeserialize: deserialize_agency_Protocol,
    responseSerialize: serialize_agency_ProtocolState,
    responseDeserialize: deserialize_agency_ProtocolState,
  },
  // Start asks the agency to start a protocol. It immediately returns a
// protocol id that allows to monitor protocol with the Status function. If
// Agent service's Listen is in use, we get a notification when protocol is
// ready.
start: {
    path: '/agency.DIDComm/Start',
    requestStream: false,
    responseStream: false,
    requestType: protocol_pb.Protocol,
    responseType: protocol_pb.ProtocolID,
    requestSerialize: serialize_agency_Protocol,
    requestDeserialize: deserialize_agency_Protocol,
    responseSerialize: serialize_agency_ProtocolID,
    responseDeserialize: deserialize_agency_ProtocolID,
  },
  // Status returns a current ProtocolStatus which offers both typed data fields
// and combined JSON string.
status: {
    path: '/agency.DIDComm/Status',
    requestStream: false,
    responseStream: false,
    requestType: protocol_pb.ProtocolID,
    responseType: protocol_pb.ProtocolStatus,
    requestSerialize: serialize_agency_ProtocolID,
    requestDeserialize: deserialize_agency_ProtocolID,
    responseSerialize: serialize_agency_ProtocolStatus,
    responseDeserialize: deserialize_agency_ProtocolStatus,
  },
  // Resume tells the protocol state machine how to proceed when it's waiting
// user action.
resume: {
    path: '/agency.DIDComm/Resume',
    requestStream: false,
    responseStream: false,
    requestType: protocol_pb.ProtocolState,
    responseType: protocol_pb.ProtocolID,
    requestSerialize: serialize_agency_ProtocolState,
    requestDeserialize: deserialize_agency_ProtocolState,
    responseSerialize: serialize_agency_ProtocolID,
    responseDeserialize: deserialize_agency_ProtocolID,
  },
  // Release releases the protocol state machine from agency. It can be called
// only when protocol is in Ready state. After release you can access the
// status information with the others services of your system.
release: {
    path: '/agency.DIDComm/Release',
    requestStream: false,
    responseStream: false,
    requestType: protocol_pb.ProtocolID,
    responseType: protocol_pb.ProtocolID,
    requestSerialize: serialize_agency_ProtocolID,
    requestDeserialize: deserialize_agency_ProtocolID,
    responseSerialize: serialize_agency_ProtocolID,
    responseDeserialize: deserialize_agency_ProtocolID,
  },
};

exports.DIDCommClient = grpc.makeGenericClientConstructor(DIDCommService);
