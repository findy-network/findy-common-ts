import fs from 'fs';
import {
  downloadRelease,
} from '@terascope/fetch-github-release';
import tar from 'tar';

import log from '../../log';

export const CLI_VERSION = 'v0.24.20';
export const outputPath = './bin';

interface GithubRelease {
    tag_name: string;
}

interface GithubReleaseAsset {
    name: string;
}


export default async (platform: string, arch: string): Promise<string> => {
  const user = 'findy-network';
  const repo = 'findy-agent-cli';

  log.info(`Download binary ${CLI_VERSION} for ${platform} - ${arch}`);

  const filterRelease = (item: GithubRelease): boolean =>
    item.tag_name === CLI_VERSION;
  const filterAsset = (item: GithubReleaseAsset): boolean =>
    item.name.includes(platform) && item.name.includes(arch);
  const leaveZipped = true;
  const disableLogging = true;

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }

  const filenames = [];
  try {
    const res = await downloadRelease(
      user,
      repo,
      outputPath,
      filterRelease,
      filterAsset,
      leaveZipped,
      disableLogging
    );
    filenames.push(...res);
  } catch (err) {
    log.error(err);
    return '';
  }

  await tar.extract({ file: filenames[0], cwd: outputPath });

  fs.rmSync(filenames[0]);

  return `${outputPath}/findy-agent-cli`;
};
