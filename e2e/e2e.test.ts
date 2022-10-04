import {
  createAcator,
  openGRPCConnection,
  agencyv1,
  AgentClient,
  ProtocolClient,
  statusParser
} from '../dist/index';

describe('e2e', () => {
  const authUrl = 'http://localhost:8088';
  const user1Name = `user-1-${new Date().getTime()}`;
  const user2Name = `user-2-${new Date().getTime()}`;
  const key =
    '15308490f1e4026284594dd08d31291bc8ef2aeac730d0daf6ff87bb92d4336c';
  const serverAddress = 'localhost';
  const serverPort = 50052;
  const certPath = './tools/config/cert';
  const createClients = async (
    user: string
  ): Promise<{ agentClient: AgentClient; protocolClient: ProtocolClient }> => {
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

  const waitForResult = (): {
    setResult: (value: any) => void;
    wait: () => Promise<any>;
  } => {
    let result: any;
    return {
      setResult: (value: any) => {
        result = value;
      },
      wait: async (): Promise<any> =>
        await new Promise((resolve): void => {
          const checkResult = (): void => {
            if (result !== undefined) {
              resolve(result);
            } else {
              setTimeout(checkResult, 100);
            }
          };
          checkResult();
        })
    };
  };

  it('should connect', async () => {
    // Set up agents
    const user1 = await createClients(user1Name);
    expect(user1.agentClient).toBeDefined();
    expect(user1.protocolClient).toBeDefined();

    const user2 = await createClients(user2Name);
    expect(user2.agentClient).toBeDefined();
    expect(user2.protocolClient).toBeDefined();

    const invMsg = new agencyv1.InvitationBase();
    invMsg.setLabel(user1Name);

    // Wait for new connection
    const connectionId = waitForResult();
    const user1Stream = await user1.agentClient.startListening(
      (status, err) => {
        statusParser({
          DIDExchangeDone: (id, data) => connectionId.setResult(data.getId())
        }, status, err)
      },
      {
        protocolClient: user1.protocolClient,
        retryOnError: false,
        autoRelease: true,
        autoProtocolStatus: true,
        filterKeepalive: true
      }
    );

    const invResult = await user1.agentClient.createInvitation(invMsg);
    expect(invResult.getJson()).toBeDefined();
    expect(invResult.getUrl()).toBeDefined();

    const pwMsg = new agencyv1.Protocol.DIDExchangeMsg();
    pwMsg.setInvitationjson(invResult.getUrl());
    pwMsg.setLabel(user2Name);

    const pwResult = await user2.protocolClient.connect(pwMsg);
    expect(pwResult).toBeDefined();

    const id = await connectionId.wait();
    expect(JSON.parse(invResult.getJson())['@id']).toEqual(id);

    // wait for basic message
    const msg = waitForResult();
    const user2Stream = await user2.agentClient.startListening(
      (status, err) => {
        statusParser({
          BasicMessageDone: (id, data) => msg.setResult(data.getContent())
        }, status, err)
      },
      {
        protocolClient: user2.protocolClient,
        retryOnError: false,
        autoRelease: true,
        autoProtocolStatus: true,
        filterKeepalive: true
      }
    );

    const testMessage = 'Hello world';
    const basicMsg = new agencyv1.Protocol.BasicMessageMsg();
    basicMsg.setContent(testMessage);

    const msgResult = await user1.protocolClient.sendBasicMessage(id, basicMsg);
    expect(msgResult).toBeDefined();

    // ensure basic message matches
    const receivedMessage = await msg.wait();
    expect(receivedMessage).toEqual(testMessage);

    // stop streams
    user1Stream.cancel();
    user2Stream.cancel();
  });
});
