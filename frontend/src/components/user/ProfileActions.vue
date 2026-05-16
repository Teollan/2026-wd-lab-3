<script setup lang="ts">
import { RouterLink } from 'vue-router'

const emit = defineEmits<{
  logOut: []
}>()
</script>

<template>
  <div class="mt-6 flex gap-3">
    <RouterLink
      to="/my-posts"
      class="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-content-primary hover:bg-accent-hover"
    >
      View my posts
    </RouterLink>

    <button
      type="button"
      class="rounded-lg bg-destructive/20 px-5 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/30"
      @click="emit('logOut')"
    >
      Log Out
    </button>
  </div>
</template>
