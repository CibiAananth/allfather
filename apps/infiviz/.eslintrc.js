/** @format */

module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
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
