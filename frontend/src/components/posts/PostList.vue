<script setup lang="ts">
import type { PostWithAuthorAndComments } from '@/models/Post'
import PostCard from '@/components/posts/PostCard.vue'

defineProps<{
  title: string
  posts: PostWithAuthorAndComments[]
  showActions?: boolean
}>()

const emit = defineEmits<{
  createComment: [postId: number, content: string]
  editPost: [postId: number]
  deletePost: [postId: number]
}>()
</script>

<template>
  <h1 class="mb-8 text-3xl font-bold text-content-primary">
    {{ title }}
  </h1>

  <slot v-if="!posts.length" name="empty" />

  <div v-else class="space-y-8">
    <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :show-actions="showActions"
      @create-comment="(postId, content) => emit('createComment', postId, content)"
      @edit-post="(postId) => emit('editPost', postId)"
      @delete-post="(postId) => emit('deletePost', postId)"
    />
  </div>
</template>
