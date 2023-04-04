/** @format */
const fs = require('fs');

const versionPath = `${process.cwd()}/VERSION`;
const releasePath = `${process.cwd()}/RELEASE`;

async function run(semanticRelease) {
  try {
    const result = await semanticRelease({
      // Core options
      dryRun: true,
      ci: false,
    });

    if (result) {
      const { nextRelease } = result;
      if (!nextRelease) {
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
    } else {
      console.log('No release published.');
    }
  } catch (err) {
    console.error('The automated release failed with %O', err);
  }
}

import('semantic-release').then(sr => {
  run(sr.default);
});
