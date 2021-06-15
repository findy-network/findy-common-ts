const express = require('express');
const app = express();

const port = 3100;
const authUrl = "http://localhost:8088";
const userName = "findy-common-ts-e2e-1";
const key = "15308490f1e4026284594dd08d31291bc8ef2aeac730d0daf6ff87bb92d4336c";
const serverAddress = "localhost";
const serverPort = 50052;
const certPath = "./config/cert";

const messages = [];

const common = require('../dist/index');
const { createAcator, openGRPCConnection, agencyv1 } = common;

const init = async () => {
  const acatorProps = {
    authUrl,
    userName,
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

  app.get('/', (req, res) => {
    res.send(messages.join('\n'));
  });

  app.post('/invitation', async (req, res) => {
    const newId = uuidv4();
    log.info(`Creating invitation for ${userName} - ${newId}`);

    const msg = new agencyv1.InvitationBase();
    msg.setLabel(config.ourName);
    msg.setId(newId);

    const result = await agentClient.createInvitation(msg);

    res.send(result.getJson());
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

(async () => {
  await init();
})();
