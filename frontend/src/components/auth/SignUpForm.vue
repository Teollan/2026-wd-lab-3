<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const { error } = storeToRefs(authStore)

const username = ref('')
const email = ref('')
const password = ref('')
const gender = ref('')
const dateOfBirth = ref('')
const bio = ref('')

async function onSubmit() {
  const ok = await authStore.signUp({
    username: username.value,
    email: email.value,
    password: password.value,
    gender: gender.value,
    dateOfBirth: dateOfBirth.value,
    bio: bio.value,
  })

  if (ok) {
    router.push('/feed')
  }
}

onUnmounted(() => authStore.clearError())
</script>

<template>
  <div class="mx-auto max-w-md">
    <h1 class="mb-2 text-center text-3xl font-bold text-content-primary">Create an account</h1>

    <p class="mb-8 text-center text-content-tertiary">Join BlogSpace today</p>

    <form
      class="space-y-5 rounded-xl border border-stroke-primary bg-surface-secondary p-6"
      @submit.prevent="onSubmit"
    >
      <div>
        <label for="name" class="mb-1 block text-sm font-medium text-content-secondary">
          Username
        </label>

        <input
          id="name"
          v-model="username"
          name="username"
          type="text"
          required
          placeholder="John Doe"
          class="w-full rounded-lg border border-stroke-secondary bg-surface-tertiary px-4 py-2.5 text-content-primary placeholder-content-tertiary focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
        />
      </div>

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
        <label for="password" class="mb-1 block text-sm font-medium text-content-secondary">
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

      <fieldset>
        <legend class="mb-2 text-sm font-medium text-content-secondary">Gender</legend>

        <div class="flex gap-6">
          <label class="flex items-center gap-2 text-sm text-content-secondary">
            <input
              v-model="gender"
              type="radio"
              name="gender"
              required
              value="male"
              class="border-stroke-secondary bg-surface-tertiary text-accent focus:ring-accent/20"
            />
            Male
          </label>

          <label class="flex items-center gap-2 text-sm text-content-secondary">
            <input
              v-model="gender"
              type="radio"
              name="gender"
              required
              value="female"
              class="border-stroke-secondary bg-surface-tertiary text-accent focus:ring-accent/20"
            />
            Female
          </label>

          <label class="flex items-center gap-2 text-sm text-content-secondary">
            <input
              v-model="gender"
              type="radio"
              name="gender"
              required
              value="other"
              class="border-stroke-secondary bg-surface-tertiary text-accent focus:ring-accent/20"
            />
            Other
          </label>
        </div>
      </fieldset>

      <div>
        <label for="date-of-birth" class="mb-1 block text-sm font-medium text-content-secondary">
          Date of birth
        </label>

        <input
          id="date-of-birth"
          v-model="dateOfBirth"
          name="dateOfBirth"
          type="date"
          required
          class="w-full rounded-lg border border-stroke-secondary bg-surface-tertiary px-4 py-2.5 text-content-primary focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
        />
      </div>

      <div>
        <label for="bio" class="mb-1 block text-sm font-medium text-content-secondary"> Bio </label>

        <textarea
          id="bio"
          v-model="bio"
          name="bio"
          rows="3"
          required
          placeholder="Tell us about yourself..."
          class="w-full resize-none rounded-lg border border-stroke-secondary bg-surface-tertiary px-4 py-2.5 text-content-primary placeholder-content-tertiary focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
        ></textarea>
      </div>

      <p v-if="error" class="rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
        {{ error }}
      </p>

      <button
        type="submit"
        class="w-full cursor-pointer rounded-lg bg-accent px-4 py-2.5 font-medium text-content-primary hover:bg-accent-hover focus:ring-2 focus:ring-accent/20 focus:outline-none"
      >
        Create account
      </button>

      <p class="text-center text-sm text-content-tertiary">
        Already have an account?

        <RouterLink to="/sign-in" class="text-accent-hover hover:text-accent-light">
          Sign in
        </RouterLink>
      </p>
    </form>
  </div>
</template>
