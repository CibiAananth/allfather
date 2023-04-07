/** @format */

/**
 * This script use `spawn` to run the linting and formatting scripts
 * The stdout is piped to the process.stdin so that the output is displayed in the terminal as and when executing
 * In other words the output of command executing can be streamed realtime to the console
 * To disable this and view only errors(if occurred) then use the `lint-code:exec.js` file
 */

const { spawn } = require('child_process');
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

function stdStream(child) {
  child.stdout.on('data', data => {
    process.stdout.write(data);
  });
  child.stderr.on('data', data => {
    process.stderr.write(data);
  });
}

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
  const child = spawn('pnpm', ['run', 'format']);
  stdStream(child);
  await new Promise((resolve, reject) => {
    child.on('close', code => {
      if (code === 0) {
        logger({ message: 'Pretty', level: 'success', id });
        resolve();
      } else {
        reject({
          message: "Whoops, looks like we couldn't format the code!",
          id,
        });
      }
    });
  });
}

async function lintCss() {
  const id = 'lint-css';
  logger({
    message: 'Checking Stylesheets for issues...',
    level: 'info',
    id,
  });
  const child = spawn('pnpm', ['run', 'lint:css']);
  stdStream(child);
  await new Promise((resolve, reject) => {
    child.on('close', code => {
      if (code === 0) {
        logger({ message: 'Suits up 💅', level: 'success', id });
        resolve();
      } else {
        reject({ message: 'Yikes, we found some issues with styling!', id });
      }
    });
  });
}

async function lintSrc() {
  const id = 'lint-src';
  logger({
    message: 'Analyzing code for issues...',
    level: 'info',
    id,
  });
  const child = spawn('pnpm', ['run', 'lint']);
  stdStream(child);
  await new Promise((resolve, reject) => {
    child.on('close', code => {
      if (code === 0) {
        logger({ message: 'Bloody Sweet!', level: 'success', id });
        resolve();
      } else {
        reject({ message: 'Houston, we have a problem with the code!', id });
      }
    });
  });
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
    logger({ ...error, level: 'error' });
    process.exit(1);
  }
}

main();
