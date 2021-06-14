module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['src/idl', 'e2e/*'],
  plugins: ['@typescript-eslint', 'jest'],
  extends: [
    'standard-with-typescript',
    'prettier',
    'plugin:jest/recommended',
    'plugin:import/errors',
    'plugin:import/typescript'
  ],
  parserOptions: {
    project: ['./tsconfig.eslint.json']
  },
  rules: {}
};
