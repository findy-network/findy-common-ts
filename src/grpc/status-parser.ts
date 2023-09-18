import { ListenStatus } from './agent';
import { ProtocolStatus, ProtocolState, Protocol } from '../idl/protocol_pb';
import { Notification } from '../idl/agent_pb';
import log from '../log';

/**
 * ProtocolInfo contains info about the protocol.
 * @public
 */
export interface ProtocolInfo {
  protocolId: string;
  connectionId: string;
  success: boolean;
}

/**
 * Status handler implements the callback functionality for status notifications
 * @public
 */
export interface StatusHandler {
  DIDExchangeDone?: (
    info: ProtocolInfo,
    didExchange: ProtocolStatus.DIDExchangeStatus
  ) => void;
  BasicMessageDone?: (
    info: ProtocolInfo,
    basicMessage: ProtocolStatus.BasicMessageStatus
  ) => void;
  IssueCredentialPaused?: (
    info: ProtocolInfo,
    issueCredential: ProtocolStatus.IssueCredentialStatus
  ) => void;
  IssueCredentialDone?: (
    info: ProtocolInfo,
    issueCredential: ProtocolStatus.IssueCredentialStatus
  ) => void;
  PresentProofPaused?: (
    info: ProtocolInfo,
    presentProof: ProtocolStatus.PresentProofStatus
  ) => void;
  PresentProofDone?: (
    info: ProtocolInfo,
    presentProof: ProtocolStatus.PresentProofStatus
  ) => void;
  Error?: (info: ProtocolInfo, error: Error) => void;
}

/**
 * statusParser parses the agency status notifications and uses
 * @see {@link StatusHandler} for notifying the client.
 * @public
 */
export const statusParser = (
  handler: StatusHandler,
  status?: ListenStatus,
  error?: Error
) => {
  const notification = status?.agent.getNotification();
  const protocolStatus = status?.protocol;
  const state = protocolStatus?.getState()?.getState();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getValueName = (obj: any, code: number | undefined) =>
    Object.keys(obj).find((item) => obj[item] === code);

  const typeName = getValueName(Notification.Type, notification?.getTypeid());
  const protocolName = getValueName(
    Protocol.Type,
    notification?.getProtocolType()
  );
  const statusName = getValueName(ProtocolState.State, state);
  notification &&
    log.debug(`Received ${typeName} for ${protocolName} - ${statusName}`);

  const info = {
    protocolId: notification?.getProtocolid() || '',
    connectionId: notification?.getConnectionid() || '',
    success: state === ProtocolState.State.OK
  };

  // Error encountered
  if (error) {
    handler.Error && handler.Error(info, error);
  }
  // Protocol ready
  else if (
    (notification?.getTypeid() === Notification.Type.STATUS_UPDATE &&
      state === ProtocolState.State.OK) ||
    state === ProtocolState.State.ERR
  ) {
    switch (notification?.getProtocolType()) {
      case Protocol.Type.DIDEXCHANGE: {
        const data = protocolStatus?.getDidExchange();
        handler.DIDExchangeDone && data && handler.DIDExchangeDone(info, data);
        break;
      }
      case Protocol.Type.BASIC_MESSAGE: {
        const data = protocolStatus?.getBasicMessage();
        handler.BasicMessageDone &&
          data &&
          handler.BasicMessageDone(info, data);
        break;
      }
      case Protocol.Type.PRESENT_PROOF: {
        const data = protocolStatus?.getPresentProof();
        handler.PresentProofDone &&
          data &&
          handler.PresentProofDone(info, data);
        break;
      }
      case Protocol.Type.ISSUE_CREDENTIAL: {
        const data = protocolStatus?.getIssueCredential();
        handler.IssueCredentialDone &&
          data &&
          handler.IssueCredentialDone(info, data);
        break;
      }
      default:
        break;
    }
    // Protocol paused
  } else if (notification?.getTypeid() === Notification.Type.PROTOCOL_PAUSED) {
    switch (notification?.getProtocolType()) {
      case Protocol.Type.PRESENT_PROOF: {
        const data = protocolStatus?.getPresentProof();
        handler.PresentProofPaused &&
          data &&
          handler.PresentProofPaused(info, data);
        break;
      }
      case Protocol.Type.ISSUE_CREDENTIAL: {
        const data = protocolStatus?.getIssueCredential();
        handler.IssueCredentialPaused &&
          data &&
          handler.IssueCredentialPaused(info, data);
        break;
      }
      default:
        break;
    }
  }
};
