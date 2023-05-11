/** @format */

import { initReactI18next } from 'react-i18next/initReactI18next';

import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

import type { Locale } from './settings';
import { getOptions } from './settings';

const initI18next = async (lng: Locale, ns: string) => {
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        async (language: string, namespace: string) =>
          // eslint-disable-next-line node/no-unsupported-features/es-syntax
          import(`./locales/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(lng, ns));

  return i18nInstance;
};

export async function useTranslation(lng: Locale, ns: string, options = {}) {
  const i18nextInstance = await initI18next(lng, ns);

  return {
    t: i18nextInstance.getFixedT(lng, ns),
    i18n: i18nextInstance,
  };
}
