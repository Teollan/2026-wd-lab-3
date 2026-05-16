<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { User } from '@/models/User'
import NavLink from '@/components/ui/NavLink.vue'
import AppAvatar from '@/components/ui/AppAvatar.vue'

defineProps<{
  user: User | null
}>()

const route = useRoute()
const isProfileActive = computed(() => route.path === '/profile')
</script>

<template>
  <nav id="nav-menu" class="hidden md:block">
    <ul class="flex flex-col gap-1 md:flex-row md:gap-6">
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

        <li>
          <RouterLink
            to="/profile"
            class="block rounded-full ring-2"
            :class="isProfileActive ? 'ring-accent-hover' : 'ring-transparent hover:ring-accent/40'"
          >
            <AppAvatar :user="user" />
          </RouterLink>
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
