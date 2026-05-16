<script setup lang="ts">
import type { PostWithAuthorAndComments } from '@/models/Post'
import AppAvatar from '@/components/ui/AppAvatar.vue'
import PostActions from '@/components/posts/PostActions.vue'
import PostCommentSection from '@/components/posts/PostCommentSection.vue'
import { formatDate } from '@/utils/date'

defineProps<{
  post: PostWithAuthorAndComments
  showActions?: boolean
}>()

const emit = defineEmits<{
  createComment: [postId: number, content: string]
  editPost: [postId: number]
  deletePost: [postId: number]
}>()
</script>

<template>
  <article class="rounded-xl border border-stroke-primary bg-surface-secondary p-6">
    <div class="mb-3 flex items-center" :class="showActions ? 'justify-between' : 'gap-3'">
      <div class="flex items-center gap-3">
        <AppAvatar :user="post.author" />

        <div>
          <p class="text-sm font-medium text-content-primary">
            {{ post.author.username }}
          </p>

          <p class="text-xs text-content-tertiary">
            {{ formatDate(post.createdAt) }}
          </p>
        </div>
      </div>

      <PostActions
        v-if="showActions"
        @edit="emit('editPost', post.id)"
        @delete="emit('deletePost', post.id)"
      />
    </div>

    <h2 class="mb-2 text-xl font-semibold text-content-primary">
      {{ post.title }}
    </h2>

    <p class="mb-4 text-content-secondary">
      {{ post.content }}
    </p>

    <PostCommentSection
      :comments="post.comments"
      @submit="(content) => emit('createComment', post.id, content)"
    />
  </article>
</template>
