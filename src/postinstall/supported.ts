const supported: { [key: string]: any } = {
  arch: {
    ia32: '386',
    x64: 'x86',
    arm: 'arm'
  },
  platform: {
    darwin: 'Darwin',
    linux: 'Linux',
    win32: 'Windows'
  }
};

export default supported;
