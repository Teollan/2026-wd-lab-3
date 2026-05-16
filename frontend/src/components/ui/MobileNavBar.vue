<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { User } from '@/models/User'
import NavLink from '@/components/ui/NavLink.vue'
import AppAvatar from '@/components/ui/AppAvatar.vue'

defineProps<{
  user: User | null
  isOpen: boolean
}>()

const route = useRoute()
const isProfileActive = computed(() => route.path === '/profile')
</script>

<template>
  <nav
    id="mobile-menu"
    class="absolute top-full left-0 w-full border-y border-stroke-primary bg-surface-primary md:hidden"
    :class="{ hidden: !isOpen }"
  >
    <ul class="flex flex-col gap-1 px-4 py-3">
      <li v-if="user">
        <RouterLink
          to="/profile"
          class="flex items-center gap-3 px-3 py-2"
          :class="
            isProfileActive
              ? 'text-accent-hover'
              : 'text-content-secondary hover:text-content-primary'
          "
        >
          <AppAvatar :user="user" />

          <span class="text-lg font-medium">{{ user.username }}</span>
        </RouterLink>
      </li>

      <li>
        <NavLink to="/" label="About" />
      </li>

      <template v-if="user">
        <li>
          <NavLink to="/feed" label="Feed" />
        </li>

        <li>
          <NavLink to="/my-posts" label="My Posts" />
        </li>

        <li>
          <NavLink to="/new-post" label="New Post" />
        </li>
      </template>

      <template v-else>
        <li>
          <NavLink to="/sign-in" label="Sign In" />
        </li>

        <li>
          <NavLink to="/sign-up" label="Sign Up" />
        </li>
      </template>
    </ul>
  </nav>
</template>
