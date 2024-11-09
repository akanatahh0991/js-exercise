module.exports = {
  parserOptions: {
    sourceType: 'module',
  },
  // googleでGoogle Javascript Style Guideを指定
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'google',
    'prettier',
  ],
  env: {
    es2022: true,
    node: true,
    jest: true,
    browser: true,
  },
  rules: {
    'prettier/prettier': 'error', // Prettierルールの違反をエラーとして報告
  },
  overrides: [
    {
      files: ['**/*.js'],
      plugins: ['flowtype'],
      extends: ['plugin:flowtype/recommended'],
      parser: 'babel-eslint',
      rules: {
        'flowtype/no-types-missing-file-annotation': 2,
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
    },
  ],
  ignorePatterns: ['ex01/format_sample.js'],
  root: true,
};
