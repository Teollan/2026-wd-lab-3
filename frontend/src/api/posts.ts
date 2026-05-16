import { api } from '@/api/client'
import type { User } from '@/models/User'
import type { CommentWithAuthor } from '@/models/Comment'
import type { PostWithAuthorAndComments } from '@/models/Post'

// Shapes returned by the backend (password omitted, dates as ISO strings).
interface ApiUser {
  id: number
  email: string
  username: string
  dateOfBirth: string
  gender: string
  bio: string
  createdAt: string
}

interface ApiComment {
  id: number
  postId: number
  authorId: number
  content: string
  createdAt: string
  author: ApiUser
}

interface ApiPost {
  id: number
  authorId: number
  title: string
  content: string
  createdAt: string
  author: ApiUser
  comments: ApiComment[]
}

const mapUser = (u: ApiUser): User => ({
  ...u,
  password: '',
  dateOfBirth: new Date(u.dateOfBirth),
  createdAt: new Date(u.createdAt),
})

const mapComment = (c: ApiComment): CommentWithAuthor => ({
  id: c.id,
  postId: c.postId,
  authorId: c.authorId,
  content: c.content,
  createdAt: new Date(c.createdAt),
  author: mapUser(c.author),
})

const mapPost = (p: ApiPost): PostWithAuthorAndComments => ({
  id: p.id,
  authorId: p.authorId,
  title: p.title,
  content: p.content,
  createdAt: new Date(p.createdAt),
  author: mapUser(p.author),
  comments: p.comments.map(mapComment),
})

export async function fetchFeed(): Promise<PostWithAuthorAndComments[]> {
  const { data } = await api.get<ApiPost[]>('/posts')
  return data.map(mapPost)
}

export async function fetchMyPosts(authorId: number): Promise<PostWithAuthorAndComments[]> {
  const { data } = await api.get<ApiPost[]>('/posts', { params: { authorId } })
  return data.map(mapPost)
}

export async function fetchPost(id: number): Promise<PostWithAuthorAndComments> {
  const { data } = await api.get<ApiPost>(`/posts/${id}`)
  return mapPost(data)
}

export async function createPost(input: {
  authorId: number
  title: string
  content: string
}): Promise<void> {
  await api.post('/posts', input)
}

export async function updatePost(
  id: number,
  input: { title: string; content: string },
): Promise<void> {
  await api.patch(`/posts/${id}`, input)
}

export async function deletePost(id: number): Promise<void> {
  await api.delete(`/posts/${id}`)
}
