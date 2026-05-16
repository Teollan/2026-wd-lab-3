import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { AxiosError } from 'axios'
import type { User } from '@/models/User'
import { signIn as apiSignIn, signUp as apiSignUp, fetchMe } from '@/api/auth'
import type { SignUpInput } from '@/api/auth'
import { getToken, setToken, clearToken } from '@/api/token'

function errorMessage(e: unknown, fallback: string): string {
  if (e instanceof AxiosError) {
    return e.response?.data?.error ?? fallback
  }
  return fallback
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => user.value !== null)

  /** Hydrate session from a stored token on app start. */
  async function init(): Promise<void> {
    if (!getToken()) {
      return
    }

    try {
      user.value = await fetchMe()
    } catch {
      clearToken()
      user.value = null
    }
  }

  async function signIn(email: string, password: string): Promise<boolean> {
    try {
      const { token, user: u } = await apiSignIn(email, password)
      setToken(token)
      user.value = u
      error.value = null

      return true
    } catch (e) {
      error.value = errorMessage(e, 'Sign in failed')

      return false
    }
  }

  async function signUp(input: SignUpInput): Promise<boolean> {
    try {
      const { token, user: u } = await apiSignUp(input)
      setToken(token)
      user.value = u
      error.value = null

      return true
    } catch (e) {
      error.value = errorMessage(e, 'Sign up failed')

      return false
    }
  }

  function logOut(): void {
    clearToken()
    user.value = null
  }

  function clearError(): void {
    error.value = null
  }

  return { user, error, isAuthenticated, init, signIn, signUp, logOut, clearError }
})
