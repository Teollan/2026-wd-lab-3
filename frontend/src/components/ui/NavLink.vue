<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  to: string
  label: string
}>()
</script>

<template>
  <RouterLink v-slot="{ href, navigate, isExactActive }" :to="to" custom>
    <a
      :href="href"
      class="block px-3 py-2"
      :class="
        isExactActive ? 'text-accent-hover' : 'text-content-secondary hover:text-content-primary'
      "
      @click="navigate"
    >
      {{ label }}
    </a>
  </RouterLink>
</template>
