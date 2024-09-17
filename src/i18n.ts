import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translations from './locales/en/translations.json'

export const defaultNS = "translations";
export const resources = {
  en: {
    translations
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "en",
  ns: ["translations"],
  defaultNS,
  resources
});