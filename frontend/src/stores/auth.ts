import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/models/User'
import { AuthRepository } from '@/repositories/auth.repository'

interface SignInInput {
  email: string
  password: string
}

interface SignUpInput {
  email: string
  username: string
  password: string
  dateOfBirth: Date
  gender: string
  bio: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(AuthRepository.findAuthUser())
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => user.value !== null)

  function signIn(input: SignInInput): boolean {
    try {
      user.value = AuthRepository.signIn(input)
      error.value = null

      return true
    } catch (e) {
      error.value = (e as Error).message

      return false
    }
  }

  function signUp(input: SignUpInput): boolean {
    try {
      user.value = AuthRepository.signUp(input)
      error.value = null

      return true
    } catch (e) {
      error.value = (e as Error).message

      return false
    }
  }

  function logOut(): void {
    AuthRepository.logOut()
    user.value = null
  }

  function clearError(): void {
    error.value = null
  }

  return { user, error, isAuthenticated, signIn, signUp, logOut, clearError }
})
