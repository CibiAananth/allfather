/** @format */

const configCommitAnalyzer = {
  preset: 'conventionalcommits',
  releaseRules: [
    { type: 'feat', release: 'minor' },
    { type: 'fix', release: 'patch' },
    { type: 'perf', release: 'patch' },
    { type: 'revert', release: 'patch' },
    { type: 'refactor', scope: 'core-*', release: 'minor' },
    { type: 'refactor', scope: 'components-*', release: 'minor' },
    { type: 'refactor', scope: 'pages-*', release: 'minor' },
    { type: 'docs', scope: 'README', release: 'patch' },
    { scope: 'no-release', release: false },
  ],
};

const configReleaseNotesGenerator = {
  preset: 'conventionalcommits',
  presetConfig: {
    types: [
      { type: 'feat', section: 'Features' },
      { type: 'fix', section: 'Bug Fixes' },
      { type: 'perf', section: 'Performance Improvements' },
      { type: 'docs', hidden: true },
      { type: 'style', hidden: true },
      { type: 'refactor', hidden: true },
      { type: 'test', hidden: true },
      { type: 'build', hidden: true },
      { type: 'chore', hidden: true },
      { type: 'revert', hidden: true },
      { type: 'wip', hidden: true },
      { type: 'ci', hidden: true },
      { type: 'release', hidden: true },
    ],
  },
};

const config = {
  noCi: true,
  repositoryUrl: 'git@github.com:CibiAananth/allfather.git',
  branches: [
    'main',
    {
      name: 'beta',
      channel: 'beta',
      prerelease: true,
    },
    {
      name: 'pre/rc',
      channel: 'pre/rc',
      prerelease: 'rc',
    },
    {
      name: 'hotfix/*',
      channel: 'hotfix',
      prerelease: 'hotfix',
    },
    {
      name: 'dev/*',
      channel: 'dev',
      prerelease: 'dev',
    },
    {
      name: 'ci/*',
      channel: 'ci',
      prerelease: 'ci',
    },
  ],
  plugins: [
    ['@semantic-release/commit-analyzer', configCommitAnalyzer],
    ['@semantic-release/release-notes-generator', configReleaseNotesGenerator],
    [
      '@semantic-release/changelog',
      {
        changelogFile: './docs/CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: './pretty-code.sh',
        execCwd: './scripts',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', './docs/CHANGELOG.md'],
        message:
          'release: ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};

module.exports = config;
