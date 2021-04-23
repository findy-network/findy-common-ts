import supported from './supported';
import download from './download';
import log from '../../log';

async () => {
  const platform = supported.platform[process.platform];
  const arch = supported.arch[process.arch];

  const fileName = await download(platform, arch);
  log.info(`Downloaded CLI binary to ${fileName}`)
};
