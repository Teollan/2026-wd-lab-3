import axios from 'axios'
import { getToken, clearToken } from '@/api/token'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:3000',
})

api.interceptors.request.use((config) => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// On an expired/invalid token mid-session, drop it and bounce to sign-in.
// Auth endpoints (sign-in/sign-up/me) handle their own 401s — a bad-credentials
// 401 must show a form error, and /auth/me 401 is handled during bootstrap.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const url: string = error.config?.url ?? ''
    const isAuthRoute = url.startsWith('/auth/')

    if (status === 401 && !isAuthRoute && getToken()) {
      clearToken()
      window.location.assign('/sign-in')
    }

    return Promise.reject(error)
  },
)
