import { ListenStatus } from './agent';
import { ProtocolStatus, ProtocolState, Protocol } from '../idl/protocol_pb';
import { Notification } from '../idl/agent_pb';
import log from '../log';

export interface StatusHandler {
    DIDExchangeDone?: (protocolId: string, didExchange: ProtocolStatus.DIDExchangeStatus) => void,
    BasicMessageDone?: (protocolId: string, basicMessage: ProtocolStatus.BasicMessageStatus) => void,
    IssueCredentialPaused?: (protocolId: string, issueCredential: ProtocolStatus.IssueCredentialStatus) => void,
    IssueCredentialDone?: (protocolId: string, issueCredential: ProtocolStatus.IssueCredentialStatus) => void,
    PresentProofPaused?: (protocolId: string, presentProof: ProtocolStatus.PresentProofStatus) => void,
    PresentProofDone?: (protocolId: string, presentProof: ProtocolStatus.PresentProofStatus) => void,
    Error?: (protocolId: string, error: Error) => void,
}

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
    if (error) {
        handler.Error && handler.Error(notification?.getProtocolid() || "", error)
    }
    // Protocol ready
    else if (notification?.getTypeid() === Notification.Type.STATUS_UPDATE &&
        state === ProtocolState.State.OK) {
        switch (notification?.getProtocolType()) {
            case Protocol.Type.DIDEXCHANGE:
                handler.DIDExchangeDone &&
                    handler.DIDExchangeDone(notification.getProtocolid(), protocolStatus?.getDidExchange()!)
                break;
            case Protocol.Type.BASIC_MESSAGE:
                handler.BasicMessageDone &&
                    handler.BasicMessageDone(notification.getProtocolid(), protocolStatus?.getBasicMessage()!)
                break;
            case Protocol.Type.PRESENT_PROOF:
                handler.PresentProofDone &&
                    handler.PresentProofDone(notification.getProtocolid(), protocolStatus?.getPresentProof()!)
                break;
            case Protocol.Type.ISSUE_CREDENTIAL:
                handler.IssueCredentialDone &&
                    handler.IssueCredentialDone(notification.getProtocolid(), protocolStatus?.getIssueCredential()!)
                break;
            default:
                break;
        }
        // Protocol paused
    } else if (notification?.getTypeid() === Notification.Type.PROTOCOL_PAUSED) {
        switch (notification?.getProtocolType()) {
            case Protocol.Type.PRESENT_PROOF:
                handler.PresentProofDone &&
                    handler.PresentProofDone(notification.getProtocolid(), protocolStatus?.getPresentProof()!)
                break;
            case Protocol.Type.ISSUE_CREDENTIAL:
                handler.IssueCredentialDone &&
                    handler.IssueCredentialDone(notification.getProtocolid(), protocolStatus?.getIssueCredential()!)
                break;
            default:
                break;
        }
    }
}