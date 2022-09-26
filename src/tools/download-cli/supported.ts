const supported: { [key: string]: any } = {
  arch: {
    ia32: '386',
    x64: 'x86',
    arm: 'arm',
    arm64: 'arm64'
  },
  platform: {
    darwin: 'Darwin',
    linux: 'Linux',
    win32: 'Windows'
  }
};

export default supported;
