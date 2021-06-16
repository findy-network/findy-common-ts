import { v4 as uuidv4 } from 'uuid';

import { createAcator, openGRPCConnection, agencyv1, AgentClient, ProtocolClient } from '../dist/index';


describe('e2e', () => {
    const authUrl = "http://localhost:8088";
    const user1Name = `user-1-${new Date().getTime()}`;
    const user2Name = `user-2-${new Date().getTime()}`;
    const key = "15308490f1e4026284594dd08d31291bc8ef2aeac730d0daf6ff87bb92d4336c";
    const serverAddress = "localhost";
    const serverPort = 50052;
    const certPath = "./tools/config/cert";
    const createClients = async (user: string): Promise<{ agentClient: AgentClient, protocolClient: ProtocolClient }> => {
        const acatorProps = {
            authUrl,
            userName: user,
            key
        };

        const authenticator = createAcator(acatorProps);

        const grpcProps = {
            serverAddress,
            serverPort,
            certPath
        };

        const connection = await openGRPCConnection(grpcProps, authenticator);
        const { createAgentClient, createProtocolClient } = connection;
        const agentClient = await createAgentClient();
        const protocolClient = await createProtocolClient();
        return { agentClient, protocolClient };
    };
    it('should connect', async () => {
        // Set up agents
        const user1 = await createClients(user1Name);
        expect(user1.agentClient).toBeDefined();
        expect(user1.protocolClient).toBeDefined();

        const user2 = await createClients(user2Name);
        expect(user2.agentClient).toBeDefined();
        expect(user2.protocolClient).toBeDefined();

        const newId = uuidv4();
        const invMsg = new agencyv1.InvitationBase();
        invMsg.setLabel(user1Name);
        invMsg.setId(newId);

        // Wait for new connection
        let connectionId: string | undefined;
        const user1Stream = await user1.agentClient.startListening(
            (status) => {
                const notification = status?.agent.getNotification();
                const protocolStatus = status?.protocol;
                const state = protocolStatus?.getState()?.getState();

                if (
                    notification?.getTypeid() === agencyv1.Notification.Type.STATUS_UPDATE &&
                    notification?.getProtocolType() === agencyv1.Protocol.Type.DIDEXCHANGE &&
                    state === agencyv1.ProtocolState.State.OK
                ) {
                    connectionId = protocolStatus?.getDidExchange()?.getId()
                }
            },
            {
                protocolClient: user1.protocolClient,
                retryOnError: false,
                autoRelease: true,
                autoProtocolStatus: true,
                filterKeepalive: true,
            },
        );


        const invResult = await user1.agentClient.createInvitation(invMsg);
        expect(invResult.getJson()).toBeDefined();

        const pwMsg = new agencyv1.Protocol.DIDExchangeMsg();
        pwMsg.setInvitationjson(invResult.getJson());
        pwMsg.setLabel(user2Name);

        const pwResult = await user2.protocolClient.connect(pwMsg);
        expect(pwResult).toBeDefined();

        // ensure connection id matches
        const id = await (new Promise((resolve): void => {
            const checkConnectionId = (): void => {
                if (connectionId !== undefined) {
                    resolve(connectionId)
                } else {
                    setTimeout(checkConnectionId, 100)
                }
            }
            checkConnectionId()
        }))
        expect(JSON.parse(invResult.getJson())["@id"]).toEqual(id)


        // wait for basic message
        let msg: string | undefined;
        const user2Stream = await user2.agentClient.startListening(
            (status) => {
                const notification = status?.agent.getNotification();
                const protocolStatus = status?.protocol;
                const state = protocolStatus?.getState()?.getState();

                if (
                    notification?.getTypeid() === agencyv1.Notification.Type.STATUS_UPDATE &&
                    notification?.getProtocolType() === agencyv1.Protocol.Type.BASIC_MESSAGE &&
                    state === agencyv1.ProtocolState.State.OK
                ) {
                    msg = protocolStatus?.getBasicMessage()?.getContent()
                }
            },
            {
                protocolClient: user2.protocolClient,
                retryOnError: false,
                autoRelease: true,
                autoProtocolStatus: true,
                filterKeepalive: true,
            },
        );

        const testMessage = "Hello world"
        const basicMsg = new agencyv1.Protocol.BasicMessageMsg();
        basicMsg.setContent(testMessage);

        const msgResult = await user1.protocolClient.sendBasicMessage(connectionId ?? "", basicMsg);
        expect(msgResult).toBeDefined();

        // ensure basic message matches
        const receivedMessage = await (new Promise((resolve): void => {
            const checkMsg = (): void => {
                if (msg !== undefined) {
                    resolve(msg)
                } else {
                    setTimeout(checkMsg, 100)
                }
            }
            checkMsg()
        }))
        expect(receivedMessage).toEqual(testMessage)

        // stop streams
        user1Stream.cancel()
        user2Stream.cancel()

    });
});
