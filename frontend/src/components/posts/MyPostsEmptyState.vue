<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="rounded-xl border border-stroke-primary bg-surface-secondary p-10 text-center">
    <p class="text-lg text-content-tertiary">
      You haven't posted anything yet.
      <RouterLink to="/new-post" class="text-accent-hover hover:text-accent-light">
        Create your first post!
      </RouterLink>
    </p>
  </div>
</template>
