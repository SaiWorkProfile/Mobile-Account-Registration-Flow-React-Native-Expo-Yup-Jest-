module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',

  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'prettier',
  ],

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],

  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    'prettier/prettier': 'warn',
  },
};
