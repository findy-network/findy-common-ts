// eslint-disable-next-line @typescript-eslint/no-var-requires
const os = require('os')

const mode = process.argv[2]

const target = mode === "arch" ? {
  arm64: 'arm64',
  ia32: 'i386',
  x64: 'x86_64',
}[os.arch()] : {
  darwin: 'Darwin',
  linux: 'Linux',
  win32: 'Windows'
}[os.platform()]

if (target) {
  console.log(target)
}
