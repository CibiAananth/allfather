/** @format */

module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', __dirname]],
        extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx', '.css'],
      },
    },
  },
  plugins: ['simple-import-sort'],
  rules: {
    'sort-imports': 'off',

    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['./*.(css|scss|less)'],
          // ['@/(styles|theme)'],
          ['@/(styles|theme)(/.*|$)'],
          ['^react(-|$)'],
          ['(next|@next)(-|$|/)'],
          ['^@?\\w'],
          [
            '^@/(utils|services|hooks|hoc|types|contexts|dictionary|components|db|utilities|styles)(/.*|$)',
          ],
          // ['^@/services/'],
          // ['^@/db/'],
          // ['^@/utilities/'],
          ['^@/'],
          ['^\\.'],
        ],
      },
    ],
  },
};
