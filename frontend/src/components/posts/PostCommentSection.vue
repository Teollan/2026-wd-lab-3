<script setup lang="ts">
import { ref } from 'vue'
import type { CommentWithAuthor } from '@/models/Comment'
import CommentCard from '@/components/comments/CommentCard.vue'

defineProps<{
  comments: CommentWithAuthor[]
}>()

const emit = defineEmits<{
  submit: [content: string]
}>()

const content = ref('')

function onSubmit() {
  const value = content.value.trim()

  if (!value) {
    return
  }

  emit('submit', value)
  content.value = ''
}
</script>

<template>
  <div class="border-t border-stroke-primary pt-4">
    <h3 class="mb-3 text-sm font-semibold text-content-secondary">
      Comments ({{ comments.length }})
    </h3>

    <form class="mb-4 flex gap-3" @submit.prevent="onSubmit">
      <textarea
        v-model="content"
        rows="1"
        placeholder="Add a comment..."
        class="field-sizing-content min-h-9 w-full flex-1 content-end resize-none rounded-lg border border-stroke-secondary bg-surface-tertiary px-4 py-1.5 text-sm text-content-primary placeholder-content-tertiary focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
      ></textarea>

      <button
        type="submit"
        class="cursor-pointer self-end rounded-lg bg-accent px-4 py-2 text-sm font-medium text-content-primary hover:bg-accent-hover focus:ring-2 focus:ring-accent/20 focus:outline-none"
      >
        Post
      </button>
    </form>

    <div v-if="comments.length > 0" class="space-y-3">
      <CommentCard v-for="comment in comments" :key="comment.id" :comment="comment" />
    </div>

    <p v-else class="text-sm text-content-tertiary">
      No comments yet. Be the first to share your thoughts!
    </p>
  </div>
</template>
