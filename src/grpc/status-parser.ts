import { ListenStatus } from './agent';
import { ProtocolStatus, ProtocolState, Protocol } from '../idl/protocol_pb';
import { Notification } from '../idl/agent_pb';
import log from '../log';

/**
 * Status handler implements the callback functionality for status notifications
 * @public
 */
export interface StatusHandler {
    DIDExchangeDone?: (protocolId: string, didExchange: ProtocolStatus.DIDExchangeStatus) => void,
    BasicMessageDone?: (protocolId: string, basicMessage: ProtocolStatus.BasicMessageStatus) => void,
    IssueCredentialPaused?: (protocolId: string, issueCredential: ProtocolStatus.IssueCredentialStatus) => void,
    IssueCredentialDone?: (protocolId: string, issueCredential: ProtocolStatus.IssueCredentialStatus) => void,
    PresentProofPaused?: (protocolId: string, presentProof: ProtocolStatus.PresentProofStatus) => void,
    PresentProofDone?: (protocolId: string, presentProof: ProtocolStatus.PresentProofStatus) => void,
    Error?: (protocolId: string, error: Error) => void,
}

/**
 * statusParser parses the agency status notifications and uses
 * @see {@link StatusHandler} for notifying the client.
 * @public
 */
export const statusParser = (handler: StatusHandler, status?: ListenStatus, error?: Error) => {
    const notification = status?.agent.getNotification();
    const protocolStatus = status?.protocol;
    const state = protocolStatus?.getState()?.getState();

    const getValueName = (obj: any, code: number | undefined) =>
        Object.keys(obj).find((item) => obj[item] === code);

    const typeName = getValueName(
        Notification.Type,
        notification?.getTypeid(),
    );
    const protocolName = getValueName(
        Protocol.Type,
        notification?.getProtocolType(),
    );
    const statusName = getValueName(ProtocolState.State, state);
    notification && log.debug(`Received ${typeName} for ${protocolName} - ${statusName}`);

    // Error encountered
    // TODO: handle protocol failures
    if (error) {
        handler.Error && handler.Error(notification?.getProtocolid() || "", error)
    }
    // Protocol ready
    else if (notification?.getTypeid() === Notification.Type.STATUS_UPDATE &&
        state === ProtocolState.State.OK) {
        switch (notification?.getProtocolType()) {
            case Protocol.Type.DIDEXCHANGE: {
                const data = protocolStatus?.getDidExchange()
                handler.DIDExchangeDone && data &&
                    handler.DIDExchangeDone(notification.getProtocolid(), data)
                break;
            }
            case Protocol.Type.BASIC_MESSAGE: {
                const data = protocolStatus?.getBasicMessage()
                handler.BasicMessageDone && data &&
                    handler.BasicMessageDone(notification.getProtocolid(), data)
                break;
            }
            case Protocol.Type.PRESENT_PROOF: {
                const data = protocolStatus?.getPresentProof()
                handler.PresentProofDone && data &&
                    handler.PresentProofDone(notification.getProtocolid(), data)
                break;
            }
            case Protocol.Type.ISSUE_CREDENTIAL: {
                const data = protocolStatus?.getIssueCredential()
                handler.IssueCredentialDone && data &&
                    handler.IssueCredentialDone(notification.getProtocolid(), data)
                break;
            }
            default:
                break;
        }
        // Protocol paused
    } else if (notification?.getTypeid() === Notification.Type.PROTOCOL_PAUSED) {
        switch (notification?.getProtocolType()) {
            case Protocol.Type.PRESENT_PROOF: {
                const data = protocolStatus?.getPresentProof()
                handler.PresentProofPaused && data &&
                    handler.PresentProofPaused(notification.getProtocolid(), data)
                break;
            }
            case Protocol.Type.ISSUE_CREDENTIAL: {
                const data = protocolStatus?.getIssueCredential()
                handler.IssueCredentialPaused && data &&
                    handler.IssueCredentialPaused(notification.getProtocolid(), data)
                break;
            }
            default:
                break;
        }
    }
}