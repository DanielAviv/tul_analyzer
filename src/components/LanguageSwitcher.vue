<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const LOCALES = [
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
]

function setLocale(code) {
  locale.value = code
}
</script>

<template>
  <div class="d-flex ga-1 mr-2">
    <v-btn
      v-for="l in LOCALES"
      :key="l.code"
      :variant="locale === l.code ? 'tonal' : 'text'"
      :aria-label="l.label"
      :title="l.label"
      size="small"
      icon
      @click="setLocale(l.code)"
    >
      <span class="flag">{{ l.flag }}</span>
    </v-btn>
  </div>
</template>

<style scoped>
.flag {
  font-size: 20px;
  line-height: 1;
}
</style>
