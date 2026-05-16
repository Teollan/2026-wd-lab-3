import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PostWithAuthorAndComments } from '@/models/Post'
import { fetchFeed } from '@/api/posts'
import { createComment as apiCreateComment } from '@/api/comments'
import { useAuthStore } from '@/stores/auth'

export const useFeedStore = defineStore('feed', () => {
  const posts = ref<PostWithAuthorAndComments[]>([])

  async function load(): Promise<void> {
    posts.value = await fetchFeed()
  }

  async function createComment(postId: number, content: string): Promise<void> {
    const auth = useAuthStore()
    if (!auth.user) {
      return
    }

    await apiCreateComment({ postId, authorId: auth.user.id, content })
    await load()
  }

  return { posts, load, createComment }
})
