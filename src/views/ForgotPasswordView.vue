<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const email = ref('')
const sent = ref(false)

function submit() {
  // TODO: wire to auth service
  sent.value = true
}
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="400" class="pa-6">
      <v-card-title class="text-h5 font-weight-medium mb-2">
        {{ t('forgotPassword.title') }}
      </v-card-title>

      <template v-if="!sent">
        <v-card-text class="px-0">
          <p class="text-body-2 text-medium-emphasis mb-4">{{ t('forgotPassword.hint') }}</p>
          <v-text-field
            v-model="email"
            :label="t('login.email')"
            type="email"
            autocomplete="email"
            variant="outlined"
            density="comfortable"
          />
        </v-card-text>

        <v-card-actions class="px-0 d-flex flex-column align-stretch ga-2">
          <v-btn color="primary" size="large" block :disabled="!email" @click="submit">
            {{ t('forgotPassword.button') }}
          </v-btn>
          <v-btn variant="text" size="small" :to="{ name: 'login' }">
            {{ t('forgotPassword.backToLogin') }}
          </v-btn>
        </v-card-actions>
      </template>

      <template v-else>
        <v-card-text class="px-0">
          <v-alert type="success" variant="tonal" rounded="lg">
            {{ t('forgotPassword.sent') }}
          </v-alert>
        </v-card-text>
        <v-card-actions class="px-0">
          <v-btn variant="text" size="small" :to="{ name: 'login' }">
            {{ t('forgotPassword.backToLogin') }}
          </v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-container>
</template>
