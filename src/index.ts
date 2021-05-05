import * as agentGRPC from './idl/agent_grpc_pb';
import * as agent from './idl/agent_pb';
import * as protocolGRPC from './idl/protocol_grpc_pb';
import * as protocol from './idl/protocol_pb';

export * from './acator';
export * from './grpc';

export const agencyv1 = {
  ...agentGRPC,
  ...agent,
  ...protocolGRPC,
  ...protocol
};
