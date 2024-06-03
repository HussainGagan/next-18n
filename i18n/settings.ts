import {reloadResources, type InitOptions} from 'i18next';

export const FALLBACK_LOCALE = 'en';
export const supportedLocales = ['en', 'de', 'fr'] as const;
export type Locales = (typeof supportedLocales)[number];

// You can name the cookie to whatever you want
export const LANGUAGE_COOKIE = 'preferred_language';

export function getOptions(lang = FALLBACK_LOCALE, ns = 'common'): InitOptions {
  return {
    // debug: true, // Set to true to see console logs
    supportedLngs: supportedLocales,
    fallbackLng: FALLBACK_LOCALE,
    lng: lang,
    ns,
    backend: {
      loadPath: `/locales/{{lng}}/{{ns}}.json?v=${new Date().getTime()}`,
      requestOptions: {
        cache: 'no-cache', // Ensure no caching for the request
      },
      // reloadInterval: 1000,
    },
  };
}
