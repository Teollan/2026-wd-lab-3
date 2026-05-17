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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const url: string = error.config?.url ?? ''
    const isAuthRoute = url.startsWith('/auth/')

    if (status === 401 && !isAuthRoute && getToken()) {
      clearToken()

      window.location.assign(`${import.meta.env.BASE_URL}sign-in`)
    }

    return Promise.reject(error)
  },
)
