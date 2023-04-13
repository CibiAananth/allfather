/** @format */

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    'turbo',
    'eslint:recommended',
    'react-app',
    'react-app/jest',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:css/recommended',
    'plugin:prettier/recommended',
    'stylelint',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'css', 'prettier'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'node/no-missing-import': 'off', // to disable path alias errors
    'node/no-unpublished-import': 'off', // to disable no unpublished errors

    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'react/react-in-jsx-scope': 'off', // to disable react import errors

    'prettier/prettier': 'error',

    'import/no-unresolved': 'error',
    'import/extensions': [
      'error',
      'always',
      { ts: 'never', tsx: 'never', js: 'ignorePackages' },
    ],
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': 'warn',
    'import/no-mutable-exports': 'error',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': 'error',

    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/prefer-enum-initializers': 'error',
    '@typescript-eslint/promise-function-async': 'error',

    // Note: you must disable the base rule as it can report incorrect errors
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',

    // Note: you must disable the base rule as it can report incorrect errors
    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': 'error',

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',

    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',

    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': 'error',

    'testing-library/prefer-screen-queries': 'warn',
  },
};
