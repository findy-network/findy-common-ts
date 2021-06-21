import { exec as execCmd, ExecException } from 'child_process';

import log from '../log';

/**
 * Authenticator properties
 * @public
 */
export interface AcatorProps {
  /**
   * Full URL for the authentication service.
   */
  authUrl: string;
  /**
   * Origin URL for the authentication service - for development.
   */
  authOrigin?: string;
  /**
   * The name of our agent. Note! This name must be unique within other Findy Agency users.
   */
  userName: string;
  /**
   * Authenticator master key. Keep the key secret.
   */
  key: string;
}

/**
 * Authenticator interface for unit testing
 * @internal
 */
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

/**
 * Initializes authenticator.
 * @public
 *
 * Authenticator can be used by calling authenticator's `login`-function.
 * Login tries to do login to authentication service first. If it fails,
 * register is attempted and after that login is retried.
 *
 * Successfull login will return a JWT token for Findy Agency services.
 *
 * @example
 * Here's a simple example:
 * ```
 * const acatorProps = {
 *   authUrl: 'http://localhost:8088',
 *   userName: 'my-chat-bot',
 *   key: '15308490f1e4026284594dd08d31291bc8ef2aeac730d0daf6ff87bb92d4336c'
 * };
 *
 * const authenticator = createAcator(acatorProps);
 * const jwtToken = await authenticator.login();
 * ```
 *
 * @param props - Authenticator properties. @see {@link AcatorProps}
 */
export const createAcator = (
  { authUrl, authOrigin, userName, key }: AcatorProps,
  exec = doExec
): Acator => {
  // TODO: counter and guid for production setup
  const config: { [key: string]: string } = {
    url: authUrl,
    ...(authOrigin != null ? { origin: authOrigin } : {}),
    'user-name': userName,
    key
  };
  const rootCmd = 'findy-common-ts authn';
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
      return jwtToken.trim();
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
