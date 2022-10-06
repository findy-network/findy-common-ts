import { AgentStatus, Notification } from '../idl/agent_pb';
import { Protocol, ProtocolState, ProtocolStatus } from '../idl/protocol_pb';
import { statusParser } from './status-parser'

describe('statusParser', () => {
    const protocolId = "protocolId"

    describe('should parse done protocols', () => {
        // Done test items
        const doneStatus = {
            agent: new AgentStatus(),
            protocol: new ProtocolStatus()
        }
        const doneNotification = new Notification();
        doneNotification.setProtocolid(protocolId)
        doneNotification.setTypeid(Notification.Type.STATUS_UPDATE)
        const doneState = new ProtocolState()
        doneState.setState(ProtocolState.State.OK)
        doneStatus.protocol.setState(doneState)

        it('should parse DIDExchange done', async () => {
            let receivedId = "";
            doneNotification.setProtocolType(Protocol.Type.DIDEXCHANGE)
            doneStatus.agent.setNotification(doneNotification)
            doneStatus.protocol.setDidExchange(new ProtocolStatus.DIDExchangeStatus())

            statusParser({
                DIDExchangeDone(info) {
                    receivedId = info.protocolId
                },
            }, doneStatus, undefined)
            expect(receivedId).toMatch(protocolId);
        });

        it('should parse basic message done', async () => {
            let receivedId = "";
            doneNotification.setProtocolType(Protocol.Type.BASIC_MESSAGE)
            doneStatus.agent.setNotification(doneNotification)
            doneStatus.protocol.setBasicMessage(new ProtocolStatus.BasicMessageStatus())

            statusParser({
                BasicMessageDone(info) {
                    receivedId = info.protocolId
                },
            }, doneStatus, undefined)
            expect(receivedId).toMatch(protocolId);
        });

        it('should parse present proof done', async () => {
            let receivedId = "";
            doneNotification.setProtocolType(Protocol.Type.PRESENT_PROOF)
            doneStatus.agent.setNotification(doneNotification)
            doneStatus.protocol.setPresentProof(new ProtocolStatus.PresentProofStatus())

            statusParser({
                PresentProofDone(info) {
                    receivedId = info.protocolId
                },
            }, doneStatus, undefined)
            expect(receivedId).toMatch(protocolId);
        });

        it('should parse issue credential done', async () => {
            let receivedId = "";
            doneNotification.setProtocolType(Protocol.Type.ISSUE_CREDENTIAL)
            doneStatus.agent.setNotification(doneNotification)
            doneStatus.protocol.setIssueCredential(new ProtocolStatus.IssueCredentialStatus())

            statusParser({
                IssueCredentialDone(info) {
                    receivedId = info.protocolId
                },
            }, doneStatus, undefined)
            expect(receivedId).toMatch(protocolId);
        });
    });
    describe('should parse paused protocols', () => {
        // paused test items
        const pausedStatus = {
            agent: new AgentStatus(),
            protocol: new ProtocolStatus()
        }
        const pausedNotification = new Notification();
        pausedNotification.setProtocolid(protocolId)
        pausedNotification.setTypeid(Notification.Type.PROTOCOL_PAUSED)
        const pausedState = new ProtocolState()
        pausedState.setState(ProtocolState.State.WAIT_ACTION)
        pausedStatus.protocol.setState(pausedState)

        it('should parse present proof paused', async () => {
            let receivedId = "";
            pausedNotification.setProtocolType(Protocol.Type.PRESENT_PROOF)
            pausedStatus.agent.setNotification(pausedNotification)
            pausedStatus.protocol.setPresentProof(new ProtocolStatus.PresentProofStatus())

            statusParser({
                PresentProofPaused(info) {
                    receivedId = info.protocolId
                },
            }, pausedStatus, undefined)
            expect(receivedId).toMatch(protocolId);
        });

        it('should parse issue credential paused', async () => {
            let receivedId = "";
            pausedNotification.setProtocolType(Protocol.Type.ISSUE_CREDENTIAL)
            pausedStatus.agent.setNotification(pausedNotification)
            pausedStatus.protocol.setIssueCredential(new ProtocolStatus.IssueCredentialStatus())

            statusParser({
                IssueCredentialPaused(info) {
                    receivedId = info.protocolId
                },
            }, pausedStatus, undefined)
            expect(receivedId).toMatch(protocolId);
        });
    });
});
