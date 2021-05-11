// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2020 Harri @ OP Techlab.
//
//
'use strict';
var grpc = require('@grpc/grpc-js');
var agent_pb = require('./agent_pb.js');
var protocol_pb = require('./protocol_pb.js');

function serialize_agency_v1_AgentStatus(arg) {
  if (!(arg instanceof agent_pb.AgentStatus)) {
    throw new Error('Expected argument of type agency.v1.AgentStatus');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_v1_AgentStatus(buffer_arg) {
  return agent_pb.AgentStatus.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_v1_Answer(arg) {
  if (!(arg instanceof agent_pb.Answer)) {
    throw new Error('Expected argument of type agency.v1.Answer');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_v1_Answer(buffer_arg) {
  return agent_pb.Answer.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_v1_ClientID(arg) {
  if (!(arg instanceof agent_pb.ClientID)) {
    throw new Error('Expected argument of type agency.v1.ClientID');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_v1_ClientID(buffer_arg) {
  return agent_pb.ClientID.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_v1_CredDef(arg) {
  if (!(arg instanceof agent_pb.CredDef)) {
    throw new Error('Expected argument of type agency.v1.CredDef');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_v1_CredDef(buffer_arg) {
  return agent_pb.CredDef.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_v1_CredDefCreate(arg) {
  if (!(arg instanceof agent_pb.CredDefCreate)) {
    throw new Error('Expected argument of type agency.v1.CredDefCreate');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_v1_CredDefCreate(buffer_arg) {
  return agent_pb.CredDefCreate.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_v1_CredDefData(arg) {
  if (!(arg instanceof agent_pb.CredDefData)) {
    throw new Error('Expected argument of type agency.v1.CredDefData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_v1_CredDefData(buffer_arg) {
  return agent_pb.CredDefData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_v1_Invitation(arg) {
  if (!(arg instanceof agent_pb.Invitation)) {
    throw new Error('Expected argument of type agency.v1.Invitation');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_v1_Invitation(buffer_arg) {
  return agent_pb.Invitation.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_v1_InvitationBase(arg) {
  if (!(arg instanceof agent_pb.InvitationBase)) {
    throw new Error('Expected argument of type agency.v1.InvitationBase');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_v1_InvitationBase(buffer_arg) {
  return agent_pb.InvitationBase.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_v1_ModeCmd(arg) {
  if (!(arg instanceof agent_pb.ModeCmd)) {
    throw new Error('Expected argument of type agency.v1.ModeCmd');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_v1_ModeCmd(buffer_arg) {
  return agent_pb.ModeCmd.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_v1_PingMsg(arg) {
  if (!(arg instanceof agent_pb.PingMsg)) {
    throw new Error('Expected argument of type agency.v1.PingMsg');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_v1_PingMsg(buffer_arg) {
  return agent_pb.PingMsg.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_v1_Question(arg) {
  if (!(arg instanceof agent_pb.Question)) {
    throw new Error('Expected argument of type agency.v1.Question');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_v1_Question(buffer_arg) {
  return agent_pb.Question.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_v1_Schema(arg) {
  if (!(arg instanceof agent_pb.Schema)) {
    throw new Error('Expected argument of type agency.v1.Schema');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_v1_Schema(buffer_arg) {
  return agent_pb.Schema.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_v1_SchemaCreate(arg) {
  if (!(arg instanceof agent_pb.SchemaCreate)) {
    throw new Error('Expected argument of type agency.v1.SchemaCreate');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_v1_SchemaCreate(buffer_arg) {
  return agent_pb.SchemaCreate.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_agency_v1_SchemaData(arg) {
  if (!(arg instanceof agent_pb.SchemaData)) {
    throw new Error('Expected argument of type agency.v1.SchemaData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_agency_v1_SchemaData(buffer_arg) {
  return agent_pb.SchemaData.deserializeBinary(new Uint8Array(buffer_arg));
}


//
// AgentService is to communicate with your cloud agent. With the cloud agent
// you can Listen your agent's status, Answer to its requests and questions,
// create invitations, manage its running environment, and create schemas and
// credentials.
var AgentServiceService = exports.AgentServiceService = {
  // Listen is bidirectional function to stream AgentStatus. ClientID must be
// unique. AgentStatus includes only enough information to access the actual
// PSM and DIDComm connection with the ProtocolService.Status function.
// Summary: you listen your agent but work with our protocols.
listen: {
    path: '/agency.v1.AgentService/Listen',
    requestStream: false,
    responseStream: true,
    requestType: agent_pb.ClientID,
    responseType: agent_pb.AgentStatus,
    requestSerialize: serialize_agency_v1_ClientID,
    requestDeserialize: deserialize_agency_v1_ClientID,
    responseSerialize: serialize_agency_v1_AgentStatus,
    responseDeserialize: deserialize_agency_v1_AgentStatus,
  },
  // Wait is bidirectional function to stream service agent Questions. With
// Wait you listen your agent and if it's Issuing or Verifying VC it needs
// more information and immetiate answers from you. For instance, if a proof
// can be validated. Note! if your agent is only casual Holder it doesn't
// need to answer any of these questions. Holder communicate goes with
// ProtocolService.Resume(). Please see Give for more information.
wait: {
    path: '/agency.v1.AgentService/Wait',
    requestStream: false,
    responseStream: true,
    requestType: agent_pb.ClientID,
    responseType: agent_pb.Question,
    requestSerialize: serialize_agency_v1_ClientID,
    requestDeserialize: deserialize_agency_v1_ClientID,
    responseSerialize: serialize_agency_v1_Question,
    responseDeserialize: deserialize_agency_v1_Question,
  },
  // Give is function to answer to Questions sent from CA and arived from Wait
// function. Questions have ID and clientID which should be used when
// answering the questions.
give: {
    path: '/agency.v1.AgentService/Give',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.Answer,
    responseType: agent_pb.ClientID,
    requestSerialize: serialize_agency_v1_Answer,
    requestDeserialize: deserialize_agency_v1_Answer,
    responseSerialize: serialize_agency_v1_ClientID,
    responseDeserialize: deserialize_agency_v1_ClientID,
  },
  // CreateInvitation returns an invitation according to InvitationBase.
createInvitation: {
    path: '/agency.v1.AgentService/CreateInvitation',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.InvitationBase,
    responseType: agent_pb.Invitation,
    requestSerialize: serialize_agency_v1_InvitationBase,
    requestDeserialize: deserialize_agency_v1_InvitationBase,
    responseSerialize: serialize_agency_v1_Invitation,
    responseDeserialize: deserialize_agency_v1_Invitation,
  },
  // Ping pings the cloud agent.
ping: {
    path: '/agency.v1.AgentService/Ping',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.PingMsg,
    responseType: agent_pb.PingMsg,
    requestSerialize: serialize_agency_v1_PingMsg,
    requestDeserialize: deserialize_agency_v1_PingMsg,
    responseSerialize: serialize_agency_v1_PingMsg,
    responseDeserialize: deserialize_agency_v1_PingMsg,
  },
  // CreateSchema creates a new schema and writes it to ledger.
createSchema: {
    path: '/agency.v1.AgentService/CreateSchema',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.SchemaCreate,
    responseType: agent_pb.Schema,
    requestSerialize: serialize_agency_v1_SchemaCreate,
    requestDeserialize: deserialize_agency_v1_SchemaCreate,
    responseSerialize: serialize_agency_v1_Schema,
    responseDeserialize: deserialize_agency_v1_Schema,
  },
  // CreateCredDef creates a new credential definition to wallet and writes it
// to the ledger. Note! With current indysdk VC structure the running time is
// long, like 10-20 seconds.
createCredDef: {
    path: '/agency.v1.AgentService/CreateCredDef',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.CredDefCreate,
    responseType: agent_pb.CredDef,
    requestSerialize: serialize_agency_v1_CredDefCreate,
    requestDeserialize: deserialize_agency_v1_CredDefCreate,
    responseSerialize: serialize_agency_v1_CredDef,
    responseDeserialize: deserialize_agency_v1_CredDef,
  },
  // GetSchema returns a schema structure.
getSchema: {
    path: '/agency.v1.AgentService/GetSchema',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.Schema,
    responseType: agent_pb.SchemaData,
    requestSerialize: serialize_agency_v1_Schema,
    requestDeserialize: deserialize_agency_v1_Schema,
    responseSerialize: serialize_agency_v1_SchemaData,
    responseDeserialize: deserialize_agency_v1_SchemaData,
  },
  // GetCredDef returns a credential definition.
getCredDef: {
    path: '/agency.v1.AgentService/GetCredDef',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.CredDef,
    responseType: agent_pb.CredDefData,
    requestSerialize: serialize_agency_v1_CredDef,
    requestDeserialize: deserialize_agency_v1_CredDef,
    responseSerialize: serialize_agency_v1_CredDefData,
    responseDeserialize: deserialize_agency_v1_CredDefData,
  },
  // Enter enters the running mode command to the CA. CA executes the cmd and
// returns the result. Command pattern is selected to allow easy extensions.
enter: {
    path: '/agency.v1.AgentService/Enter',
    requestStream: false,
    responseStream: false,
    requestType: agent_pb.ModeCmd,
    responseType: agent_pb.ModeCmd,
    requestSerialize: serialize_agency_v1_ModeCmd,
    requestDeserialize: deserialize_agency_v1_ModeCmd,
    responseSerialize: serialize_agency_v1_ModeCmd,
    responseDeserialize: deserialize_agency_v1_ModeCmd,
  },
};

exports.AgentServiceClient = grpc.makeGenericClientConstructor(AgentServiceService);
