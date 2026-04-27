import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref({ email: '', name: 'Demo User', photo: null })

  const isLoggedIn = computed(() => !!user.value)

  function login(email, _password) {
    // TODO: replace with real API call
    const name = email.split('@')[0].replace(/[._]/g, ' ')
    user.value = {
      email,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      photo: null,
    }
  }

  function logout() {
    user.value = null
  }

  return { user, isLoggedIn, login, logout }
})
