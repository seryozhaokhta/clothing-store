// src/i18n/index.js

import { createI18n } from 'vue-i18n'
import en from './en'
import ru from './ru'

const messages = {
  en,
  ru
}

const i18n = createI18n({
  locale: 'ru',
  fallbackLocale: 'ru',
  messages
})

export default i18n
