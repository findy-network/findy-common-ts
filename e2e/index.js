const express = require('express');
const app = express();

const port = process.env.PORT;
const authUrl = process.env.AUTH_URL;
const userName = process.env.USER_NAME;
const key = process.env.KEY;
const serverAddress = process.env.SERVER_ADDRESS;
const serverPort = process.env.SERVER_PORT;
const certPath = process.env.CERT_PATH;

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

    const res = await agentClient.createInvitation(msg);

    res.send(res.getJson());
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

(async () => {
  await init();
})();
