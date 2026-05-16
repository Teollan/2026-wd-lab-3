<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import AppLogo from '@/components/ui/AppLogo.vue'
import DesktopNavBar from '@/components/ui/DesktopNavBar.vue'
import MobileNavBar from '@/components/ui/MobileNavBar.vue'
import IconMenu from '@/components/ui/icons/IconMenu.vue'

const { user } = storeToRefs(useAuthStore())

const isOpen = ref(false)
const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false
  },
)
</script>

<template>
  <header class="relative border-b border-stroke-primary bg-surface-primary">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
      <AppLogo />

      <button
        class="md:hidden"
        :class="isOpen ? 'text-accent-hover' : 'text-content-secondary hover:text-content-primary'"
        @click="isOpen = !isOpen"
      >
        <IconMenu />
      </button>

      <DesktopNavBar :user="user" />
    </div>

    <MobileNavBar :user="user" :is-open="isOpen" />
  </header>
</template>
