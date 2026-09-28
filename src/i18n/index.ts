import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import esMenu from './es/menu.json'
import esServices from './es/services.json'
import esUi from './es/ui.json'
import esMeta from './es/meta.json'
import enMenu from './en/menu.json'
import enServices from './en/services.json'
import enUi from './en/ui.json'
import enMeta from './en/meta.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        menu: esMenu,
        services: esServices,
        ui: esUi,
        meta: esMeta,
      },
      en: {
        menu: enMenu,
        services: enServices,
        ui: enUi,
        meta: enMeta,
      },
    },
    fallbackLng: 'es',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'etrog_lang',
    },
  })

export default i18n
