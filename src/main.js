import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './style.css'

const vuetify = createVuetify({
  theme: { defaultTheme: 'light' },
})

createApp(App).use(createPinia()).use(router).use(vuetify).use(i18n).mount('#app')
