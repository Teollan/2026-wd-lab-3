<script setup lang="ts">
import type { CommentWithAuthor } from '@/models/Comment'
import { formatDate } from '@/utils/date'

defineProps<{
  comment: CommentWithAuthor
}>()
</script>

<template>
  <div class="rounded-lg bg-surface-tertiary p-3">
    <div class="mb-1 flex items-center gap-2">
      <span class="text-sm font-medium text-content-primary">
        {{ comment.author.username }}
      </span>

      <span class="text-xs text-content-tertiary">
        {{ formatDate(comment.createdAt) }}
      </span>
    </div>

    <p class="text-sm text-content-secondary">
      {{ comment.content }}
    </p>
  </div>
</template>
