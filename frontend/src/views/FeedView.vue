<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useFeedStore } from '@/stores/feed'
import PostList from '@/components/posts/PostList.vue'
import FeedEmptyState from '@/components/posts/FeedEmptyState.vue'

const feedStore = useFeedStore()
const { posts } = storeToRefs(feedStore)

onMounted(() => feedStore.load())
</script>

<template>
  <PostList
    title="Feed"
    :posts="posts"
    @create-comment="feedStore.createComment"
  >
    <template #empty>
      <FeedEmptyState />
    </template>
  </PostList>
</template>
