<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <RouterLink to="/" class="flex items-center gap-2">
    <img src="/logo.svg" alt="BlogSpace logo" class="h-8 w-8" />
    <span class="text-lg font-semibold text-content-primary">BlogSpace</span>
  </RouterLink>
</template>
