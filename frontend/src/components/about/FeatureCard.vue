<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  icon: Component
  title: string
  body: string
}>()
</script>

<template>
  <div class="rounded-xl border border-stroke-primary bg-surface-secondary p-6">
    <div
      class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent-hover"
    >
      <component :is="icon" />
    </div>

    <h3 class="mb-2 font-semibold text-content-primary">
      {{ title }}
    </h3>

    <p class="text-sm text-content-secondary">
      {{ body }}
    </p>
  </div>
</template>
