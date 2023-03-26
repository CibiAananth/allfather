/** @format */

module.exports = {
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
      release: true,
    },
  ],
  tagFormat: '${version}',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
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
