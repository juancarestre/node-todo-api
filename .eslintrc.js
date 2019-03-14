module.exports = {
    env: {
      browser: true,
      es6: true,
    },
    extends: 'airbnb-base',
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    rules: {
      "indent": ["error", 4],
      "linebreak-style": 0,
      "no-template-curly-in-string": 0,
      "new-cap": 0,
      "no-underscore-dangle": 0
    },
  };
  