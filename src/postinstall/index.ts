import fs from 'fs';
import log from '../log';
import supported from './supported';

const binName = 'findy-agent-cli';
const targetPath = './bin';

const exec = (cmd: string) => {
  const exec = require('child_process').exec;
  return new Promise((resolve, reject) => {
    exec(
      cmd,
      (error: Error, stdout: string | Buffer, stderr: string | Buffer) => {
        if (error) {
          console.warn(error);
        }
        resolve(stdout ? stdout : stderr);
      }
    );
  });
};

const run = async (targetPath: string) => {
  const { platform, arch } = process;
  if (!(platform in supported.platform) || !(arch in supported.arch)) {
    console.error(`Not supported: ${platform}, ${arch}`);
    process.exit(1);
  }
  const path = `./dist/${binName}_${supported.platform[platform]}_${supported.arch[arch]}/${binName}`;
  await exec(`cp ${path} ${targetPath}/${binName}`);
};

log.info(`Creating target path ${targetPath}`);
if (!fs.existsSync(targetPath)) {
  fs.mkdirSync(targetPath);
}

run(targetPath);
