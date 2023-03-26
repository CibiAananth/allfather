/** @format */

const fs = require('fs');

const versionPath = `${process.cwd()}/VERSION`;
const releasePath = `${process.cwd()}/RELEASE`;

import('semantic-release').then(semanticRelease => {
  console.log('Simulating release generate the next version');
  semanticRelease
    .default({ dryRun: true, ci: false, silent: false })
    .then(result => {
      if (!result.nextRelease) {
        console.log('No new changes to be released');
        return process.exit(1);
      }

      fs.writeFileSync(versionPath, result.nextRelease.version, 'utf-8');
      fs.writeFileSync(
        releasePath,
        JSON.stringify(result.nextRelease, null, 2),
        'utf-8',
      );
      console.log(
        `Simulated successfully. Next release: ${result.nextRelease.version}`,
      );
      console.log(`VERSION generated at ${versionPath}`);
      console.log(`RELEASE generated at ${releasePath}`);
    })
    .catch(err => {
      console.log('Failed to simulate release. Error details below:');
      console.log(err);
    });
});
