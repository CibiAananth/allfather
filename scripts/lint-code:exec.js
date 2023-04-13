/** @format */

/**
 * This script use `exec` to run the linting and formatting scripts
 * The `exec` function is a wrapper around the `child_process.exec` function
 * The stdout is written to the console so that the output is displayed in the terminal only after the command has executed
 * Thus piping the stdout to write in realtime cannot be supported.
 * In other words the output of command executing cannot be streamed realtime to the console
 * To enable that use the `lint-code:spawn.js` file
 */

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const Spinnies = require('spinnies');
/**
 * Awesome spinner collection in the following links
 * https://github.com/sindresorhus/cli-spinners/blob/HEAD/spinners.json
 * https://jsfiddle.net/sindresorhus/2eLtsbey/embedded/result/
 */
const spinner = {
  interval: 80,
  frames: [
    '[    ]',
    '[=   ]',
    '[==  ]',
    '[=== ]',
    '[ ===]',
    '[  ==]',
    '[   =]',
    '[    ]',
    '[   =]',
    '[  ==]',
    '[ ===]',
    '[====]',
    '[=== ]',
    '[==  ]',
    '[=   ]',
  ],
};

const spinnies = new Spinnies({
  succeedPrefix: '✅',
  failPrefix: '🔴',
  spinner,
});

const GREEN = '\x1b[32m';
const NC = '\x1b[0m';

/**
 * @param {Object} payload
 * @param {String} payload.message
 * @param {String} payload.level
 * @param {String} payload.id
 *
 * @description
 * This function is used to log messages to the console using the spinnies package
 *
 * @example
 * logger({
 *    message: 'Applying formatting to code...',
 *    level: 'info',
 *    id: 'pretty-code',
 * });
 */
function logger({ message, level, id }) {
  if (level === 'info') {
    spinnies.add(id, {
      text: `${message} ${NC} \n`,
      color: 'purple',
    });
  } else if (level === 'error') {
    spinnies.fail(id, { text: `${message} ${NC} \n` });
  } else if (level === 'success') {
    spinnies.succeed(id, { text: `${message} ${NC} \n` });
  }
}

async function prettyCode() {
  const id = 'pretty-code';
  logger({
    message: 'Applying formatting to code...',
    level: 'info',
    id,
  });
  try {
    await exec('pnpm run format');
    logger({ message: 'Pretty', level: 'success', id });
  } catch (error) {
    console.error(error.stdout);
    throw {
      message: "Whoops, looks like we couldn't format the code!",
      level: 'error',
      id,
    };
  }
}

async function lintCss() {
  const id = 'lint-css';
  logger({
    message: 'Checking Stylesheets for issues...',
    level: 'info',
    id,
  });

  try {
    await exec('pnpm run lint:css');
    logger({ message: 'Suits up 💅', level: 'success', id });
  } catch (error) {
    console.error(error.stdout);
    throw {
      message: 'Yikes, we found some issues with styling!',
      level: 'error',
      id,
    };
  }
}

async function lintSrc() {
  const id = 'lint-src';
  logger({
    message: 'Analyzing code for issues...',
    level: 'info',
    id,
  });

  try {
    await exec('pnpm run lint');
    logger({ message: 'Bloody Sweet!', level: 'success', id });
  } catch (error) {
    console.error(error.stdout);
    throw {
      message: 'Houston, we have a problem with the code!',
      level: 'error',
      id,
    };
  }
}

async function main() {
  try {
    await prettyCode();
    await lintCss();
    await lintSrc();
    // When all processes are complete, display the success message
    console.log(`${GREEN}🌈 All checks passed! 🎉 ${NC}`);
    process.exit();
  } catch (error) {
    logger({
      ...error,
      level: 'error',
    });
    process.exit(1);
  }
}

main();
