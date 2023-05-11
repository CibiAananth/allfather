/** @format */

export type Locale = 'en' | 'zh';

export type Language = {
  value: Locale;
  fullLabel: string;
  shortLabel: string;
};

// languages supported by the application
export const LANGUAGES: Language[] = [
  {
    value: 'en',
    fullLabel: 'English',
    shortLabel: 'EN',
  },
  {
    value: 'zh',
    fullLabel: '普通话',
    shortLabel: 'CN',
  },
];

/**
 * @description - Helper to load browser language if needed & fallback to default locale
 * if the browser language is not supported by the application
 * @format
 * @returns {Locale}
 */
export const getBrowserLanguage = () => {
  //  get the preferred language of the user browser
  const language = navigator.languages[0] || navigator.language;
  //  check if the user language is supported by the application
  const languageCode = language.split('-')[0];
  const languageSupported = LANGUAGES.find(_ => _.value === languageCode);

  // return the language code if supported or the default locale
  return languageSupported
    ? languageCode
    : process.env.INZ_DEFAULT_LOCALE || 'en';
};
