<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import AboutHero from '@/components/about/AboutHero.vue'
import AboutFeatures from '@/components/about/AboutFeatures.vue'

const { isAuthenticated } = storeToRefs(useAuthStore())
</script>

<template>
  <AboutHero :is-authenticated="isAuthenticated" />

  <AboutFeatures />
</template>
