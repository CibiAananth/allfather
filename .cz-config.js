/** @format */

module.exports = {
  types: [
    { value: 'feat', name: 'feat: A new feature' },
    { value: 'fix', name: 'fix: A bug fix' },
    { value: 'docs', name: 'docs: Documentation only changes' },
    {
      value: 'style',
      name: 'style: Changes that do not affect the meaning of the code\n(white-space, formatting, missing semi-colons, etc)',
    },
    {
      value: 'refactor',
      name: 'refactor: A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'perf',
      name: 'perf: A code change that improves performance',
    },
    { value: 'test', name: 'test: Adding missing tests' },
    {
      value: 'chore',
      name: 'chore: Changes to the build process or auxiliary tools\nand libraries such as documentation generation',
    },
    { value: 'revert', name: 'revert: Revert to a commit' },
    { value: 'wip', name: 'wip: Work in progress' },
    { value: 'ci', name: 'ci: CI or Build changes' },
    { value: 'release', name: 'release: Release commit' },
  ],
  scopes: [{ name: 'no-release' }],
  // it needs to match the value for field type. Eg.: 'fix'
  scopeOverrides: {
    docs: [{ name: 'README' }],
    refactor: [{ name: 'components' }, { name: 'core' }, { name: 'pages' }],
  },
  usePreparedCommit: true, // to re-use commit from ./.git/COMMIT_EDITMSG
  allowTicketNumber: true,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'INS-',
  ticketNumberRegExp: '\\d{1,5}',
  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:\n",
    scope:
      'Denote the SCOPE of this change (use empty for no-scope or custom for custom-scope):\n',
    // used if allowCustomScopes is true
    customScope: 'Denote the custom SCOPE of this change:\n',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer:
      'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?\n',
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  skipQuestions: ['body', 'footer'],
  // limit subject length
  subjectLimit: 100,
  breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
};
