<script setup lang="ts">
import { computed } from 'vue'
import type { User } from '@/models/User'
import { getInitials } from '@/utils/string'

const props = withDefaults(
  defineProps<{
    user: User
    size?: 'sm' | 'lg'
  }>(),
  { size: 'sm' },
)

const SIZES = {
  sm: 'h-9 w-9 text-sm',
  lg: 'h-16 w-16 text-2xl',
}

const AVATAR_COLORS = [
  'bg-sky-500/20 text-sky-400',
  'bg-emerald-500/20 text-emerald-400',
  'bg-purple-500/20 text-purple-400',
  'bg-amber-500/20 text-amber-400',
  'bg-rose-500/20 text-rose-400',
  'bg-cyan-500/20 text-cyan-400',
  'bg-indigo-500/20 text-indigo-400',
  'bg-lime-500/20 text-lime-400',
  'bg-fuchsia-500/20 text-fuchsia-400',
  'bg-teal-500/20 text-teal-400',
]

const color = computed(() => AVATAR_COLORS[props.user.id % AVATAR_COLORS.length])
const sizeClass = computed(() => SIZES[props.size])
const initials = computed(() => getInitials(props.user.username))
</script>

<template>
  <div
    class="flex items-center justify-center rounded-full font-bold"
    :class="[sizeClass, color]"
  >
    {{ initials }}
  </div>
</template>
