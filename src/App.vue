<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const { t } = useI18n()
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
        <LanguageSwitcher />

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

          <v-list density="compact" min-width="160">
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
