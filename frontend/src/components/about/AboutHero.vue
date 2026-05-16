<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  isAuthenticated: boolean
}>()
</script>

<template>
  <section class="mb-16 text-center">
    <img src="/logo.svg" alt="BlogSpace logo" class="mx-auto mb-6 h-20 w-20" />

    <h1 class="mb-4 text-4xl font-bold text-content-primary md:text-5xl">BlogSpace</h1>

    <p class="mx-auto max-w-2xl text-lg text-content-secondary">
      A modern blogging platform where you can share your thoughts, engage with readers
      through comments, and build a community around your ideas.
    </p>

    <div class="mt-8 flex justify-center gap-4">
      <RouterLink
        v-if="isAuthenticated"
        to="/feed"
        class="rounded-lg bg-accent px-6 py-2.5 font-medium text-content-primary hover:bg-accent-hover"
      >
        Browse the feed
      </RouterLink>

      <RouterLink
        v-else
        to="/sign-up"
        class="rounded-lg bg-accent px-6 py-2.5 font-medium text-content-primary hover:bg-accent-hover"
      >
        Get started
      </RouterLink>
    </div>
  </section>
</template>
