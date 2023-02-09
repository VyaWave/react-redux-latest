import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-xhr-backend'
import ZH from './zh-CN'
import EN from './en-US'

export const zh = 'zh'
export const en = 'en'

// learn more: https://github.com/i18next/i18next-xhr-backend
// for all options read: https://www.i18next.com/overview/configuration-options
// connect with React
i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      [zh]: {
        translation: ZH,
      },
      [en]: {
        translation: EN,
      },
    },
  })
export default i18n
