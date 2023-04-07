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
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
      },
    },
  },
};
