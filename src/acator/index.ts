import { exec as execCmd, ExecException } from 'child_process';

import log from '../log';

interface AcatorProps {
  authUrl: string;
  userName: string;
  key: string;
}

const doExec = (cmd: string) => {
  return new Promise(
    (resolve: (res: string) => void, reject: (err: ExecException) => void) => {
      execCmd(cmd, (error, stdout, stderr) => {
        if (error) {
          log.warn(error);
          reject(error);
        } else {
          resolve(stdout ? stdout : stderr);
        }
      });
    }
  );
};

export default ({ authUrl, userName, key }: AcatorProps, exec = doExec) => {
  // TODO: counter and guid for production setup
  const config: { [key: string]: any } = {
    url: authUrl,
    'user-name': userName,
    key
  };
  const rootCmd = 'findy-agent-cli authn';
  const params = Object.keys(config)
    .map((item) => `--${item} ${config[item]}`)
    .join(' ');
  const loginCmd = `${rootCmd} login ${params}`;
  const registerCmd = `${rootCmd} register ${params}`;

  const login = async () => {
    // First try login. If login fails, we probably haven't registered
    // so try to register and then login.
    try {
      const jwtToken = await exec(loginCmd);
      log.info('Agent login succeeded with first try.');
      return jwtToken;
    } catch {
      log.info('Agent login failed with first try, trying to register...');
      const registerOutput = await exec(registerCmd);

      log.info(`Agent register complete with result: ${registerOutput}`);
      const jwtToken = await exec(loginCmd);

      log.info('Agent login succeeded after registration!');
      return jwtToken;
    }
  };

  return { login };
};
