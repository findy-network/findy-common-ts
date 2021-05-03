import { exec as execCmd, ExecException } from 'child_process';

import log from '../log';

export interface AcatorProps {
  authUrl: string;
  userName: string;
  key: string;
}

export interface Acator {
  login: () => Promise<string>;
}

const doExec = async (cmd: string): Promise<string> => {
  return await new Promise(
    (resolve: (res: string) => void, reject: (err: ExecException) => void) => {
      execCmd(cmd, (error, stdout, stderr) => {
        if (error != null) {
          log.warn(error);
          reject(error);
        } else {
          resolve(stdout != null ? stdout : stderr);
        }
      });
    }
  );
};

export default (
  { authUrl, userName, key }: AcatorProps,
  exec = doExec
): Acator => {
  // TODO: counter and guid for production setup
  const config: { [key: string]: string } = {
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

  const login = async (): Promise<string> => {
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
      return jwtToken.trim();
    }
  };

  return { login };
};
