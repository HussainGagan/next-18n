import {createInstance} from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import {initReactI18next} from 'react-i18next/initReactI18next';
import {
  FALLBACK_LOCALE,
  getOptions,
  Locales,
  LANGUAGE_COOKIE,
} from './settings';
import {cookies} from 'next/headers';
import {getTranslationFileFromAPI} from '../actions/action';
import HttpBackend from 'i18next-http-backend';

async function initI18next(lang: Locales, namespace: string) {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(HttpBackend)
    .use(
      resourcesToBackend(
        // Get the JSON file that matches the locale and namespace
        async (lang: string, ns: string) => {
          console.log('in server');
          const data = await getTranslationFileFromAPI({lang, from: 'server'});
          return data;
          // import(`./locales/${lang}/${ns}.json`);
        },
      ),
    )
    // Initialize i18next with the options we created earlier
    .init(getOptions(lang, namespace));

  return i18nInstance;
}

// This function will be used in our server components for the translation
export async function createTranslation(ns: string = 'common') {
  const lang = getLocale();
  const i18nextInstance = await initI18next(lang, ns);

  return {
    t: i18nextInstance.getFixedT(lang, Array.isArray(ns) ? ns[0] : ns),
  };
}

// Utility function to get the locale from server components
export function getLocale() {
  return (cookies().get(LANGUAGE_COOKIE)?.value ?? FALLBACK_LOCALE) as Locales;
}
