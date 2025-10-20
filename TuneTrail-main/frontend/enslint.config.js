module.exports = {
    root: true,
    env: {
      node: true,
      es6: true,
      browser: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['react', 'react-hooks'],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Other rules...
    },
  };