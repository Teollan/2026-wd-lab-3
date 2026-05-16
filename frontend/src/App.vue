<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from '@/components/ui/TheHeader.vue'
import TheFooter from '@/components/ui/TheFooter.vue'
</script>

<template>
  <TheHeader />

  <main class="mx-auto w-full max-w-5xl flex-1 px-4 py-12">
    <RouterView />
  </main>

  <TheFooter />
</template>
