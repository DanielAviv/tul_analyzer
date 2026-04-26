import { createI18n } from 'vue-i18n'
import es from '@/i18n/es.js'
import en from '@/i18n/en.js'

export default createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en',
  messages: { es, en },
})
