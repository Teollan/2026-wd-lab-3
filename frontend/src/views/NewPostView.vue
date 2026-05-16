<script setup lang="ts">
import { useRouter } from 'vue-router'
import { createPost } from '@/api/posts'
import PostForm from '@/components/posts/PostForm.vue'

const router = useRouter()

async function onSubmit(payload: { title: string; content: string }) {
  await createPost(payload)
  router.push('/my-posts')
}
</script>

<template>
  <PostForm mode="create" @submit="onSubmit" />
</template>
