const jsgl = require('js-green-licenses');
const { mkdirSync, existsSync, writeFileSync, copyFileSync } = require('fs');

const runCheck = async (path, verbose) => {
  const checker = new jsgl.LicenseChecker({ verbose });
  if (verbose) {
    checker.setDefaultHandlers();
  }
  const licenses = [];
  checker.on('non-green-license', (arg) => {
    licenses.push(arg);
  });
  checker.on('package.json', (arg) => {
    console.log(`Scanning ${arg}`);
  });
  checker.on('error', (err) => {
    console.log(err);
  });
  await checker.checkLocalDirectory(path);
  return licenses;
};

(async () => {
  const pkg = require('../package.json');
  const path = '.temp';

  if (!existsSync(path)) {
    mkdirSync(path);
  }

  // include all our dependencies (but not our deps dev deps)
  pkg.dependencies = { ...pkg.dependencies, ...pkg.devDependencies };

  writeFileSync(`${path}/package.json`, JSON.stringify(pkg));

  // Report mode - list all licenses in report file
  if (process.argv[2] === 'report') {
    writeFileSync(
      `${path}/js-green-licenses.json`,
      JSON.stringify({ greenLicenses: [] })
    );

    const licenses = await runCheck(path);
    const reportPath = process.argv[3];
    writeFileSync(
      reportPath,
      licenses.reduce(
        (result, { packageName, version, licenseName }) =>
          `${result}\n${packageName}@${version} ${licenseName}`,
        ''
      )
    );
    console.log(`Licenses listed to ${reportPath}`);
  }

  copyFileSync(
    `./tools/js-green-licenses.json`,
    `${path}/js-green-licenses.json`
  );
  const licenses = await runCheck(path, true);
  if (licenses.length > 0) {
    licenses.map(({ packageName, version, licenseName }) =>
      console.log(
        `Found invalid license for ${packageName}@${version}: ${licenseName}`
      )
    );
    console.log('Check license terms for invalid licenses! Either');
    console.log('1) remove incompatible package');
    console.log('2) add license to greenLicenses');
    console.log('3) add package to exception list (packageAllowList)');
    process.exit(1);
  }
})();
