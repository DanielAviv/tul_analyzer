<script setup>
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
const { t } = useI18n()
</script>

<template>
  <v-app>
    <v-app-bar color="primary" density="compact">
      <v-app-bar-title>
        <router-link to="/" class="text-white text-decoration-none">
          {{ t('appTitle') }}
        </router-link>
      </v-app-bar-title>
      <template #append>
        <LanguageSwitcher />
      </template>
    </v-app-bar>
    <v-main style="height: 100%">
      <router-view />
    </v-main>
  </v-app>
</template>
