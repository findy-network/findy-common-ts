// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2020 Harri @ OP Techlab.
//
//
'use strict';
var grpc = require('@grpc/grpc-js');
var agent_pb = require('./agent_pb.js');
var protocol_pb = require('./protocol_pb.js');

function serialize_agency_AgentStatus(arg) {
  if (!(arg instanceof agent_pb.AgentStatus)) {
    throw new Error('Expected argument of type agency.AgentStatus');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_AgentStatus(buffer_arg) {
  return agent_pb.AgentStatus.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_Answer(arg) {
  if (!(arg instanceof agent_pb.Answer)) {
    throw new Error('Expected argument of type agency.Answer');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_Answer(buffer_arg) {
  return agent_pb.Answer.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_ClientID(arg) {
  if (!(arg instanceof agent_pb.ClientID)) {
    throw new Error('Expected argument of type agency.ClientID');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_ClientID(buffer_arg) {
  return agent_pb.ClientID.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_CredDef(arg) {
  if (!(arg instanceof agent_pb.CredDef)) {
    throw new Error('Expected argument of type agency.CredDef');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_CredDef(buffer_arg) {
  return agent_pb.CredDef.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_CredDefCreate(arg) {
  if (!(arg instanceof agent_pb.CredDefCreate)) {
    throw new Error('Expected argument of type agency.CredDefCreate');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_CredDefCreate(buffer_arg) {
  return agent_pb.CredDefCreate.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_CredDefData(arg) {
  if (!(arg instanceof agent_pb.CredDefData)) {
    throw new Error('Expected argument of type agency.CredDefData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_CredDefData(buffer_arg) {
  return agent_pb.CredDefData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_Invitation(arg) {
  if (!(arg instanceof agent_pb.Invitation)) {
    throw new Error('Expected argument of type agency.Invitation');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_Invitation(buffer_arg) {
  return agent_pb.Invitation.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_InvitationBase(arg) {
  if (!(arg instanceof agent_pb.InvitationBase)) {
    throw new Error('Expected argument of type agency.InvitationBase');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_InvitationBase(buffer_arg) {
  return agent_pb.InvitationBase.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_PingMsg(arg) {
  if (!(arg instanceof agent_pb.PingMsg)) {
    throw new Error('Expected argument of type agency.PingMsg');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_PingMsg(buffer_arg) {
  return agent_pb.PingMsg.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_SAImplementation(arg) {
  if (!(arg instanceof agent_pb.SAImplementation)) {
    throw new Error('Expected argument of type agency.SAImplementation');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_SAImplementation(buffer_arg) {
  return agent_pb.SAImplementation.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_Schema(arg) {
  if (!(arg instanceof agent_pb.Schema)) {
    throw new Error('Expected argument of type agency.Schema');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_Schema(buffer_arg) {
  return agent_pb.Schema.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_SchemaCreate(arg) {
  if (!(arg instanceof agent_pb.SchemaCreate)) {
    throw new Error('Expected argument of type agency.SchemaCreate');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_SchemaCreate(buffer_arg) {
  return agent_pb.SchemaCreate.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_SchemaData(arg) {
  if (!(arg instanceof agent_pb.SchemaData)) {
    throw new Error('Expected argument of type agency.SchemaData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_SchemaData(buffer_arg) {
  return agent_pb.SchemaData.deserializeBinary(new Uint8Array(buffer_arg));
}


//
// Agent is a service to communicate with your cloud agent.
var AgentService = exports.AgentService = {
  // Listen is async function to stream AgentStatus. ClientID must be unique.
listen: {
    path: '/agency.Agent/Listen',
    requestStream: false,
    responseStream: true,
    requestType: agent_pb.ClientID,
    responseType: agent_pb.AgentStatus,
    requestSerialize: serialize_agency_ClientID,
    requestDeserialize: deserialize_agency_ClientID,
    responseSerialize: serialize_agency_AgentStatus,
    responseDeserialize: deserialize_agency_AgentStatus,
  },
  // Give is function to give answer to ACTION_NEEDED_xx notifications.
give: {
    path: '/agency.Agent/Give',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.Answer,
    responseType: agent_pb.ClientID,
    requestSerialize: serialize_agency_Answer,
    requestDeserialize: deserialize_agency_Answer,
    responseSerialize: serialize_agency_ClientID,
    responseDeserialize: deserialize_agency_ClientID,
  },
  createInvitation: {
    path: '/agency.Agent/CreateInvitation',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.InvitationBase,
    responseType: agent_pb.Invitation,
    requestSerialize: serialize_agency_InvitationBase,
    requestDeserialize: deserialize_agency_InvitationBase,
    responseSerialize: serialize_agency_Invitation,
    responseDeserialize: deserialize_agency_Invitation,
  },
  setImplId: {
    path: '/agency.Agent/SetImplId',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.SAImplementation,
    responseType: agent_pb.SAImplementation,
    requestSerialize: serialize_agency_SAImplementation,
    requestDeserialize: deserialize_agency_SAImplementation,
    responseSerialize: serialize_agency_SAImplementation,
    responseDeserialize: deserialize_agency_SAImplementation,
  },
  ping: {
    path: '/agency.Agent/Ping',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.PingMsg,
    responseType: agent_pb.PingMsg,
    requestSerialize: serialize_agency_PingMsg,
    requestDeserialize: deserialize_agency_PingMsg,
    responseSerialize: serialize_agency_PingMsg,
    responseDeserialize: deserialize_agency_PingMsg,
  },
  createSchema: {
    path: '/agency.Agent/CreateSchema',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.SchemaCreate,
    responseType: agent_pb.Schema,
    requestSerialize: serialize_agency_SchemaCreate,
    requestDeserialize: deserialize_agency_SchemaCreate,
    responseSerialize: serialize_agency_Schema,
    responseDeserialize: deserialize_agency_Schema,
  },
  createCredDef: {
    path: '/agency.Agent/CreateCredDef',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.CredDefCreate,
    responseType: agent_pb.CredDef,
    requestSerialize: serialize_agency_CredDefCreate,
    requestDeserialize: deserialize_agency_CredDefCreate,
    responseSerialize: serialize_agency_CredDef,
    responseDeserialize: deserialize_agency_CredDef,
  },
  getSchema: {
    path: '/agency.Agent/GetSchema',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.Schema,
    responseType: agent_pb.SchemaData,
    requestSerialize: serialize_agency_Schema,
    requestDeserialize: deserialize_agency_Schema,
    responseSerialize: serialize_agency_SchemaData,
    responseDeserialize: deserialize_agency_SchemaData,
  },
  getCredDef: {
    path: '/agency.Agent/GetCredDef',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.CredDef,
    responseType: agent_pb.CredDefData,
    requestSerialize: serialize_agency_CredDef,
    requestDeserialize: deserialize_agency_CredDef,
    responseSerialize: serialize_agency_CredDefData,
    responseDeserialize: deserialize_agency_CredDefData,
  },
};

exports.AgentClient = grpc.makeGenericClientConstructor(AgentService);
