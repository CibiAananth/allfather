/** @format */
import type { NextRequest } from 'next/server';

import acceptLanguage from 'accept-language';

// cookie name used to store the user language preference
export const cookieName = 'x-inz-lang';

// settings
export const settings = {
  defaultLocale: 'en',
  locales: ['en', 'zh'],
  defaultNS: 'common',
} as const;

export type Locale = (typeof settings)['locales'][number];

export type Settings = typeof settings;

export type Language = {
  locale: Locale;
  fullLabel: string;
  shortLabel: string;
};

// languages supported by the application
export const languages: Language[] = [
  {
    locale: 'en',
    fullLabel: 'English',
    shortLabel: 'EN',
  },
  {
    locale: 'zh',
    fullLabel: '普通话',
    shortLabel: 'CN',
  },
];

acceptLanguage.languages(settings.locales.map(locale => locale as string));

/**
 * Validates if the given language code is a valid Locale value.
 * @param langCode - The language code to validate.
 * @returns {Locale | null} - Returns a valid Locale value or null if it's not valid.
 */
function validateLanguageCode(langCode: string): Locale | null {
  return settings.locales.includes(langCode as Locale)
    ? (langCode as Locale)
    : null;
}

/**
 * @description - Helper to load browser language from custom cookies or 'Accept-Language' header or navigator.languages in the order or precedence & fallback to default locale
 * if the browser language is not supported by the application
 *
 * @returns {Locale}
 */
export const getBrowserLanguage: (req: NextRequest) => Locale = (
  req: NextRequest,
) => {
  let browserLanguage: string | null;

  if (req.cookies.has(cookieName)) {
    // get the preferred language of the user browser from custom cookie
    browserLanguage = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  } else {
    // get the preferred language of the user browser from Accept-Language header
    browserLanguage = acceptLanguage.get(req.headers.get('Accept-Language'));
  }

  if (validateLanguageCode(browserLanguage as string)) {
    return browserLanguage as Locale;
  }

  //  get the preferred language of the user browser from navigator.languages
  const language = navigator.languages[0] || navigator.language;

  [browserLanguage] = language.split('-');

  // return the language code if valid or use locale from ENV variable or default locale
  return (
    validateLanguageCode(browserLanguage) ||
    ((process.env.INZ_DEFAULT_LOCALE || settings.defaultLocale) as Locale)
  );
};

export const getOptions: (locale: Locale, NS: string) => object = (
  locale: Locale = settings.defaultLocale,
  NS: string = settings.defaultNS,
) => {
  return {};
};
