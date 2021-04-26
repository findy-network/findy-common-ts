import supported from './supported';
import download from './download';
import log from '../../log';

const run = async (): Promise<void> => {
  const platform = supported.platform[process.platform];
  const arch = supported.arch[process.arch];

  const fileName = await download(platform, arch);
  log.info(`Downloaded CLI binary to ${fileName}`);
};

run().then(
  () => {
    log.info('All done!');
  },
  () => {}
);
