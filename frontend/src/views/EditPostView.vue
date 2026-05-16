<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchPost, updatePost } from '@/api/posts'
import type { PostWithAuthorAndComments } from '@/models/Post'
import PostForm from '@/components/posts/PostForm.vue'

const route = useRoute()
const router = useRouter()

const postId = Number(route.query.id)
const post = ref<PostWithAuthorAndComments | null>(null)

onMounted(async () => {
  try {
    post.value = await fetchPost(postId)
  } catch {
    router.replace('/my-posts')
  }
})

async function onSubmit(payload: { title: string; content: string }) {
  await updatePost(postId, payload)
  router.push('/my-posts')
}
</script>

<template>
  <PostForm
    v-if="post"
    mode="edit"
    :initial-title="post.title"
    :initial-content="post.content"
    @submit="onSubmit"
  />
</template>
