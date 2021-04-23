import { statSync, rmSync, existsSync } from 'fs';
import download, { outputPath } from './download';
import supported from './supported';

const cleanUp = () => {
  if (existsSync(outputPath)) {
    rmSync(outputPath, { recursive: true });
  }
};

beforeAll(cleanUp);
afterAll(cleanUp);

describe('Download', () => {
  it('should download file', async () => {
    const platform = supported.platform[process.platform];
    const arch = supported.arch[process.arch];

    const fileName = await download(platform, arch);
    expect(fileName).toBeDefined();

    if (fileName) {
      const fileStats = statSync(fileName);
      expect(fileStats.size).toBeGreaterThan(0);
    }
  }, 10000);
});
