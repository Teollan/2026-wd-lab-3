import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'

async function bootstrap() {
  const app = createApp(App)

  app.use(createPinia())

  // Restore session from a stored JWT before the router (and its guards) run.
  await useAuthStore().init()

  app.use(router)
  app.mount('#app')
}

bootstrap()
