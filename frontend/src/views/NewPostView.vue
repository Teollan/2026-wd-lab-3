<script setup lang="ts">
import { useRouter } from 'vue-router'
import { createPost } from '@/api/posts'
import { useAuthStore } from '@/stores/auth'
import PostForm from '@/components/posts/PostForm.vue'

const router = useRouter()
const auth = useAuthStore()

async function onSubmit(payload: { title: string; content: string }) {
  if (!auth.user) {
    return
  }

  await createPost({ authorId: auth.user.id, ...payload })
  router.push('/my-posts')
}
</script>

<template>
  <PostForm mode="create" @submit="onSubmit" />
</template>
