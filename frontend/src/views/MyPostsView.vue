<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMyPostsStore } from '@/stores/myPosts'
import PostList from '@/components/posts/PostList.vue'
import MyPostsEmptyState from '@/components/posts/MyPostsEmptyState.vue'

const router = useRouter()
const myPostsStore = useMyPostsStore()
const { posts } = storeToRefs(myPostsStore)

onMounted(() => myPostsStore.load())

function editPost(postId: number) {
  router.push({ path: '/edit-post', query: { id: postId } })
}
</script>

<template>
  <PostList
    title="My Posts"
    :posts="posts"
    show-actions
    @create-comment="myPostsStore.createComment"
    @edit-post="editPost"
    @delete-post="myPostsStore.deletePost"
  >
    <template #empty>
      <MyPostsEmptyState />
    </template>
  </PostList>
</template>
