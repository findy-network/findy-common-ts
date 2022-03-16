# findy-common-ts

[![test](https://github.com/findy-network/findy-common-ts/actions/workflows/test.yml/badge.svg?branch=dev)](https://github.com/findy-network/findy-common-ts/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/findy-network/findy-common-ts/branch/dev/graph/badge.svg?token=IHRO30DGIE)](https://codecov.io/gh/findy-network/findy-common-ts)

Module that provides common findy-agent usage functionality.

## Description

This library provides utilities for connecting to Findy Agency from a Node.js-application.
It provides

- means to authenticate to agency using [findy auth services](https://github.com/findy-network/findy-agent-auth)
- helpers for opening and making [the GRPC API](https://github.com/findy-network/findy-agent-api) calls
- TS code generated from GRPC API proto file

The focus is to provide utilities especially long-running webapps that intend to issue and verify credentials.

## Usage

1. [Setup](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-with-a-personal-access-token) GitHub package registry authentication

1. Run

   ```sh
   echo "@findy-network:registry=https://npm.pkg.github.com" >> .npmrc
   npm install @findy-network/findy-common-ts
   ```

1. Either use cloud agency installation or [setup agency to your local environment](https://github.com/findy-network/findy-wallet-pwa/blob/master/tools/env/README.md#agency-setup-for-local-development).
   You need following settings for a successful connection (_defaults for local_):

   - Authentication service URL (_`http://localhost:8088`_)
   - Core agency server address (_`localhost`_)
   - Core agency server port (_`50052`_)
   - Path to core agency TLS cert files (_`/path/to/this/repo/tools/config/cert`_)

1. Check [example](#example) how to authenticate to agency and connect to other agents using the library. More advanced examples can be found in [sample webapp implementation](https://github.com/findy-network/findy-issuer-tool).

## Example

This example shows how to onboard an agent to Findy agency, create invitation and send a basic message to the new connection once the connection is established.

For more examples, check [e2e tests](./e2e) or sample webapp implementation: [issuer-tool](https://github.com/findy-network/findy-issuer-tool).

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

  // Create authenticator.
  // Authenticator onboards the agent automatically if this is the first time
  // we are connecting to auth service.
  const acatorProps = {
    authUrl,
    userName,
    key
  };
  const authenticator = createAcator(acatorProps);

  // Open GRPC connection to core agency
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

  // Create invitation. Copy the invitation from the console and use it to connect e.g.
  // with web wallet user.
  const invMsg = new agencyv1.InvitationBase();
  invMsg.setLabel(userName);
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
