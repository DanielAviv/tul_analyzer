<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)

function login() {
  auth.login(email.value, password.value)
  router.push({ name: 'home' })
}
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="400" class="pa-6">
      <v-card-title class="text-h5 font-weight-medium mb-2">{{ t('login.title') }}</v-card-title>

      <v-card-text class="px-0">
        <v-text-field
          v-model="email"
          :label="t('login.email')"
          type="email"
          autocomplete="email"
          variant="outlined"
          density="comfortable"
          class="mb-3"
        />
        <v-text-field
          v-model="password"
          :label="t('login.password')"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="current-password"
          variant="outlined"
          density="comfortable"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
        />
      </v-card-text>

      <v-card-actions class="px-0 d-flex flex-column align-stretch ga-2">
        <v-btn color="primary" size="large" block @click="login">
          {{ t('login.button') }}
        </v-btn>
        <v-btn variant="text" size="small" :to="{ name: 'forgot-password' }">
          {{ t('login.forgotPassword') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
