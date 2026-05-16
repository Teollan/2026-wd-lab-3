<script setup lang="ts">
import type { User } from '@/models/User'
import AppAvatar from '@/components/ui/AppAvatar.vue'
import { formatMonthYear } from '@/utils/date'

defineProps<{
  user: User
}>()
</script>

<template>
  <div class="mb-6 flex items-center gap-4">
    <AppAvatar :user="user" size="lg" />

    <div>
      <h2 class="text-xl font-semibold text-content-primary">
        {{ user.username }}
      </h2>

      <p class="text-sm text-content-tertiary">
        Member since {{ formatMonthYear(user.createdAt) }}
      </p>
    </div>
  </div>
</template>
