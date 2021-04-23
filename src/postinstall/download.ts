import fs from 'fs';
import fetch, {
  GithubRelease,
  GithubReleaseAsset
} from '@terascope/fetch-github-release';
import tar from 'tar';

import log from '../log';

export const CLI_VERSION = 'v0.24.3';
export const outputPath = './bin';

export default async (platform: string, arch: string) => {
  const user = 'findy-network';
  const repo = 'findy-agent-cli';

  log.info(`Download binary for ${platform} - ${arch}`);

  const filterRelease = (item: GithubRelease) => item.tag_name === CLI_VERSION;
  const filterAsset = (item: GithubReleaseAsset) =>
    item.name.includes(platform) && item.name.includes(arch);
  const leaveZipped = true;
  const disableLogging = true;

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }

  const filenames = [];
  try {
    const res = await fetch(
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
    return null;
  }

  await tar.extract({ file: filenames[0], cwd: outputPath });

  return `${outputPath}/findy-agent-cli`;
};
