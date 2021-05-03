import { getToken } from './test-utils';
import metaProvider from './metadata';

let expTime = '2s';
const acator = {
  login: async () => await Promise.resolve(getToken(expTime))
};

describe('token', () => {
  it('should not renew token', async () => {
    expTime = '2s';
    const provider = await metaProvider(acator);
    const metaOne = await provider.getMeta();

    const headerOne = metaOne.get('Authorization')[0];
    expect(headerOne).toBeDefined();

    expTime = '0s';
    const metaTwo = await provider.getMeta();
    const headerTwo = metaTwo.get('Authorization')[0];
    expect(headerTwo).toBeDefined();

    expect(headerTwo).toMatch(headerOne as string);
  });

  it('should renew token', async () => {
    expTime = '1s';
    const provider = await metaProvider(acator);
    const metaOne = await provider.getMeta();

    const headerOne = metaOne.get('Authorization')[0];
    expect(headerOne).toBeDefined();

    expTime = '0s';
    const metaTwo = await provider.getMeta();
    const headerTwo = metaTwo.get('Authorization')[0];
    expect(headerTwo).toBeDefined();

    expect(headerTwo).not.toMatch(headerOne as string);
  });
});
