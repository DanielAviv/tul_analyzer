<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const { t, locale } = useI18n()

const LOCALES = [
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
]
const router = useRouter()
const auth = useAuthStore()
const { user, isLoggedIn } = storeToRefs(auth)

const initials = computed(() => {
  if (!user.value?.name) return ''
  return user.value.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
})

function logout() {
  auth.logout()
  router.push({ name: 'login' })
}
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
        <v-menu v-if="isLoggedIn" location="bottom end" offset="8">
          <template #activator="{ props }">
            <v-btn variant="text" class="user-btn ml-1 px-2" v-bind="props">
              <v-avatar
                :image="user.photo ?? undefined"
                color="white"
                size="28"
                class="mr-2"
              >
                <span v-if="!user.photo" class="text-primary text-caption font-weight-bold">
                  {{ initials }}
                </span>
              </v-avatar>
              <span class="text-white text-body-2">{{ user.name }}</span>
              <v-icon icon="mdi-chevron-down" size="18" class="ml-1 text-white" />
            </v-btn>
          </template>

          <v-list density="compact" min-width="180">
            <v-list-item
              v-for="l in LOCALES"
              :key="l.code"
              :title="l.label"
              :active="locale === l.code"
              active-color="primary"
              @click="locale = l.code"
            >
              <template #prepend>
                <span class="locale-flag mr-3">{{ l.flag }}</span>
              </template>
            </v-list-item>
            <v-divider class="my-1" />
            <v-list-item
              :title="t('logout')"
              prepend-icon="mdi-logout"
              @click="logout"
            />
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>
    <v-main style="height: 100%">
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
.locale-flag {
  font-size: 18px;
  line-height: 1;
}
</style>
