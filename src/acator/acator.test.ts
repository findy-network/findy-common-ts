import authenticator from './index';

describe('Acator', () => {
  it('should login', async () => {
    const props = {
      authUrl: 'test-url',
      userName: 'test-name',
      key: 'test-key'
    };
    const token = 'test-token';
    let registered = false;
    const acator = authenticator(
      props,
      async (cmd) =>
        await new Promise((resolve, reject) => {
          const cfg: { [key: string]: string } = { ...props };
          if (
            Object.keys(cfg).find((item) => !cmd.includes(cfg[item])) != null
          ) {
            reject(new Error('failed'));
            return;
          }
          if (registered && cmd.includes('login')) {
            resolve(token);
          } else if (cmd.includes('register')) {
            registered = true;
            resolve('');
          } else {
            reject(new Error('failed'));
          }
        })
    );
    expect(acator).toBeDefined();

    const { login } = acator;

    // Register and login
    const registerRes = await login();
    expect(registerRes).toEqual(token);

    // Login directly
    const loginRes = await login();
    expect(loginRes).toEqual(token);
  });
});
