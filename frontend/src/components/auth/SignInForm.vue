<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const { error } = storeToRefs(authStore)

const email = ref('')
const password = ref('')

function onSubmit() {
  if (authStore.signIn({ email: email.value, password: password.value })) {
    router.push('/feed')
  }
}

onUnmounted(() => authStore.clearError())
</script>

<template>
  <div class="mx-auto max-w-md">
    <h1 class="mb-2 text-center text-3xl font-bold text-content-primary">
      Welcome back
    </h1>

    <p class="mb-8 text-center text-content-tertiary">Sign in to your account</p>

    <form
      class="space-y-5 rounded-xl border border-stroke-primary bg-surface-secondary p-6"
      @submit.prevent="onSubmit"
    >
      <div>
        <label for="email" class="mb-1 block text-sm font-medium text-content-secondary">
          Email
        </label>

        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          class="w-full rounded-lg border border-stroke-secondary bg-surface-tertiary px-4 py-2.5 text-content-primary placeholder-content-tertiary focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
        />
      </div>

      <div>
        <label
          for="password"
          class="mb-1 block text-sm font-medium text-content-secondary"
        >
          Password
        </label>

        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          required
          placeholder="••••••••"
          class="w-full rounded-lg border border-stroke-secondary bg-surface-tertiary px-4 py-2.5 text-content-primary placeholder-content-tertiary focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
        />
      </div>

      <div class="flex items-center justify-between">
        <label class="flex items-center gap-2 text-sm text-content-secondary">
          <input
            type="checkbox"
            class="rounded border-stroke-secondary bg-surface-tertiary text-accent focus:ring-accent/20"
          />
          Remember me
        </label>

        <a href="#" class="text-sm text-accent-hover hover:text-accent-light">
          Forgot password?
        </a>
      </div>

      <p
        v-if="error"
        class="rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive"
      >
        {{ error }}
      </p>

      <button
        type="submit"
        class="w-full cursor-pointer rounded-lg bg-accent px-4 py-2.5 font-medium text-content-primary hover:bg-accent-hover focus:ring-2 focus:ring-accent/20 focus:outline-none"
      >
        Sign in
      </button>

      <p class="text-center text-sm text-content-tertiary">
        Don't have an account?

        <RouterLink to="/sign-up" class="text-accent-hover hover:text-accent-light">
          Sign up
        </RouterLink>
      </p>
    </form>
  </div>
</template>
