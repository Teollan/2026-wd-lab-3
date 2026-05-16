import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PostWithAuthorAndComments } from '@/models/Post'
import { fetchMyPosts, deletePost as apiDeletePost } from '@/api/posts'
import { createComment as apiCreateComment } from '@/api/comments'
import { useAuthStore } from '@/stores/auth'

export const useMyPostsStore = defineStore('myPosts', () => {
  const posts = ref<PostWithAuthorAndComments[]>([])

  async function load(): Promise<void> {
    const auth = useAuthStore()
    if (!auth.user) {
      posts.value = []
      return
    }

    posts.value = await fetchMyPosts(auth.user.id)
  }

  async function createComment(postId: number, content: string): Promise<void> {
    const auth = useAuthStore()
    if (!auth.user) {
      return
    }

    await apiCreateComment({ postId, authorId: auth.user.id, content })
    await load()
  }

  async function deletePost(postId: number): Promise<void> {
    if (!confirm('Are you sure you want to delete this post?')) {
      return
    }

    await apiDeletePost(postId)
    await load()
  }

  return { posts, load, createComment, deletePost }
})
