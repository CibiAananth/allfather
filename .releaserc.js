/** @format */

const configCommitAnalyzer = {
  preset: 'conventionalcommits',
  releaseRules: [
    { type: 'feat', release: 'minor' },
    { type: 'fix', release: 'patch' },
    { type: 'perf', release: 'patch' },
    { type: 'revert', release: 'patch' },
    { type: 'refactor', release: 'patch' },
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
      { type: 'release', hidden: true },
    ],
  },
};

const config = {
  debug: true,
  branches: [
    {
      name: 'main',
      channel: 'main',
      release: true,
    },
    {
      name: 'next',
      channel: 'next',
      prerelease: true,
    },
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
      name: 'integration/*',
      channel: 'integration',
      prerelease: 'integration',
      //   release: true,
    },
  ],
  tagFormat: '${version}',
  plugins: [
    ['@semantic-release/commit-analyzer', configCommitAnalyzer],
    ['@semantic-release/release-notes-generator', configReleaseNotesGenerator],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
        tarballDir: '.next',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['VERSION', 'RELEASE', 'package.json'],
        message:
          'release: ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: '.next',
            label: 'Next distribution',
          },
        ],
      },
    ],
  ],
};
