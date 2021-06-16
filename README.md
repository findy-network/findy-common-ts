# findy-common-ts

Module that provides common findy-agent usage functionality.

## Description

This library provides utilities for connecting to Findy Agency from a Node.js-application.
It provides

- means to authenticate to agency using [findy auth services](https://github.com/findy-network/findy-agent-auth)
- helpers for opening and making [the GRPC API](https://github.com/findy-network/findy-agent-api) calls
- TS code generated from GRPC API proto file

The focus is to provide utilities especially long-running webapps that intend to issue and verify credentials.

## Usage

```sh
# TODO: .npmrc for packages location
npm install @findy-network/findy-common-ts
```

## Example

```ts
import {
  createAcator,
  openGRPCConnection,
  agencyv1
} from '@findy-network/findy-common-ts';

const start = async (): Promise<void> => {
  const authUrl = 'http://localhost:8088';
  const userName = `my-chat-bot`;
  const key =
    '15308490f1e4026284594dd08d31291bc8ef2aeac730d0daf6ff87bb92d4336c';
  const serverAddress = 'localhost';
  const serverPort = 50052;
  const certPath = './tools/config/cert';

  // Create authenticator
  const acatorProps = {
    authUrl,
    userName,
    key
  };
  const authenticator = createAcator(acatorProps);

  // Open GRPC connection
  const grpcProps = {
    serverAddress,
    serverPort,
    certPath
  };

  const connection = await openGRPCConnection(grpcProps, authenticator);
  const { createAgentClient, createProtocolClient } = connection;
  const agentClient = await createAgentClient();
  const protocolClient = await createProtocolClient();

  // Start listening to agent notifications
  const options = {
    protocolClient: protocolClient,
    retryOnError: false,
    autoRelease: true,
    autoProtocolStatus: true,
    filterKeepalive: true
  };
  await agentClient.startListening((status) => {
    const notification = status?.agent.getNotification();
    const protocolStatus = status?.protocol;
    const state = protocolStatus?.getState()?.getState();

    if (
      notification?.getTypeid() === agencyv1.Notification.Type.STATUS_UPDATE &&
      notification?.getProtocolType() === agencyv1.Protocol.Type.DIDEXCHANGE &&
      state === agencyv1.ProtocolState.State.OK
    ) {
      // connection established, send message to new connection
      const connectionId = protocolStatus?.getDidExchange()?.getId();
      const basicMsg = new agencyv1.Protocol.BasicMessageMsg();
      basicMsg.setContent('Hello world');

      protocolClient.sendBasicMessage(connectionId, basicMsg);
    }
  }, options);

  const newId = uuidv4();
  const invMsg = new agencyv1.InvitationBase();
  invMsg.setLabel(userName);
  invMsg.setId(newId);
  const invResult = await agentClient.createInvitation(invMsg);
  console.log(
    'Connect using this invitation and I will greet you!',
    invResult.getJson()
  );
};
```

## Development

1. Install typescript

   ```
   npm install -g typescript
   ```

1. Install deps

   ```
   npm install --ignore-scripts
   ```

1. Run unit test

   ```
   npm test
   ```

1. Run e2e test

   ```
   npm run e2e
   ```
