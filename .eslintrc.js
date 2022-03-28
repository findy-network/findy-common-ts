module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['src/idl'],
  plugins: ['@typescript-eslint', 'jest', 'eslint-plugin-tsdoc'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:jest/recommended',
    'plugin:import/recommended',
    'plugin:node/recommended',
    'plugin:eslint-comments/recommended'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },
    node: {
      tryExtensions: ['.js', '.json', '.node', '.ts', '.d.ts']
    }
  },
  rules: {
    'tsdoc/syntax': 'warn',
    'node/no-unsupported-features/es-syntax': [
      'error',
      { ignores: ['modules'] }
    ],
    '@typescript-eslint/no-empty-function': 'off'
  }
};
