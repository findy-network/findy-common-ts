import { closeClient } from '@grpc/grpc-js';
import { ProtocolServiceClient } from '../idl/protocol_grpc_pb';
import {
  Protocol,
  ProtocolID,
  ProtocolState,
  ProtocolStatus
} from '../idl/protocol_pb';
import { MetaProvider } from './metadata';
import log from '../log';

import { unaryHandler } from './utils';

/**
 * Helper client for agency protocol service.
 * @public
 *
 * @see {@link openGRPCConnection} for creating the client
 * @see API documentation for more information on API usage
 * {@link https://github.com/findy-network/findy-agent-api}
 */
export interface ProtocolClient {
  // TODO: run

  /**
   * Start asks the agency to start a protocol.
   */
  start: (msg: Protocol) => Promise<ProtocolID>;
  /**
   * Helper wrapper for starting DIDExchange protocol
   */
  connect: (msg: Protocol.DIDExchangeMsg) => Promise<ProtocolID>;
  /**
   * Helper wrapper for starting BasicMessage protocol
   */
  sendBasicMessage: (
    connectionId: string,
    msg: Protocol.BasicMessageMsg
  ) => Promise<ProtocolID>;
  /**
   * Helper wrapper for starting PresentProof protocol
   */
  sendProofRequest: (
    connectionId: string,
    msg: Protocol.PresentProofMsg
  ) => Promise<ProtocolID>;
  /**
   * Helper wrapper for starting IssueCredential protocol
   */
  sendCredentialOffer: (
    connectionId: string,
    msg: Protocol.IssueCredentialMsg
  ) => Promise<ProtocolID>;

  /**
   * Status returns a current ProtocolStatus
   */
  status: (msg: ProtocolID) => Promise<ProtocolStatus>;

  /**
   * Resume resumes paused protocol
   */
  resume: (msg: ProtocolState) => Promise<ProtocolID>;

  /**
   * Release releases successful protocol
   */
  release: (msg: ProtocolID) => Promise<ProtocolID>;

  /**
   * Closes client connection.
   */
  close: () => void;
}

/**
 * Protocol client helper creator function
 * @internal
 */
export const createProtocolClient = async (
  client: ProtocolServiceClient,
  { getMeta }: MetaProvider
): Promise<ProtocolClient> => {
  const start = async (msg: Protocol): Promise<ProtocolID> => {
    log.debug(`Protocol: start ${JSON.stringify(msg.toObject())}`);
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.start(msg, meta, unaryHandler('start', resolve, reject));
    });
  };

  const connect = async (msg: Protocol.DIDExchangeMsg): Promise<ProtocolID> => {
    log.debug(`Protocol: connect as ${msg.getLabel()}`);
    const protocol = new Protocol();
    protocol.setTypeid(Protocol.Type.DIDEXCHANGE);
    protocol.setRole(Protocol.Role.INITIATOR);
    protocol.setDidExchange(msg);
    return await start(protocol);
  };

  const sendBasicMessage = async (
    connectionId: string,
    msg: Protocol.BasicMessageMsg
  ): Promise<ProtocolID> => {
    log.debug(`Protocol: send basic message to ${connectionId}`);
    const protocol = new Protocol();
    protocol.setTypeid(Protocol.Type.BASIC_MESSAGE);
    protocol.setRole(Protocol.Role.INITIATOR);
    protocol.setConnectionid(connectionId);
    protocol.setBasicMessage(msg);
    return await start(protocol);
  };

  const sendProofRequest = async (
    connectionId: string,
    msg: Protocol.PresentProofMsg
  ): Promise<ProtocolID> => {
    log.debug(`Protocol: send proof request to ${connectionId}`);
    const protocol = new Protocol();
    protocol.setTypeid(Protocol.Type.PRESENT_PROOF);
    protocol.setRole(Protocol.Role.INITIATOR);
    protocol.setConnectionid(connectionId);
    protocol.setPresentProof(msg);

    return await start(protocol);
  };

  const sendCredentialOffer = async (
    connectionId: string,
    msg: Protocol.IssueCredentialMsg
  ): Promise<ProtocolID> => {
    log.debug(`Protocol: send credential offer to ${connectionId}`);
    const protocol = new Protocol();
    protocol.setTypeid(Protocol.Type.ISSUE_CREDENTIAL);
    protocol.setRole(Protocol.Role.INITIATOR);
    protocol.setConnectionid(connectionId);
    protocol.setIssueCredential(msg);

    return await start(protocol);
  };

  const status = async (msg: ProtocolID): Promise<ProtocolStatus> => {
    log.debug(`Protocol: status ${JSON.stringify(msg.toObject())}`);
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.status(msg, meta, unaryHandler('status', resolve, reject));
    });
  };

  const resume = async (msg: ProtocolState): Promise<ProtocolID> => {
    log.debug(`Protocol: resume ${JSON.stringify(msg.toObject())}`);
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.resume(msg, meta, unaryHandler('resume', resolve, reject));
    });
  };

  const release = async (msg: ProtocolID): Promise<ProtocolID> => {
    log.debug(`Protocol: release ${JSON.stringify(msg.toObject())}`);
    const meta = await getMeta();
    return await new Promise((resolve, reject) => {
      client.release(msg, meta, unaryHandler('release', resolve, reject));
    });
  };

  const close = (): void => {
    log.debug(`Protocol: close`);
    closeClient(client);
  };

  return {
    start,
    connect,
    sendBasicMessage,
    sendProofRequest,
    sendCredentialOffer,
    status,
    resume,
    release,
    close
  };
};
