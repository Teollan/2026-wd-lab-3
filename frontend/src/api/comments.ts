import { api } from '@/api/client'

export async function fetchCommentsByAuthor(authorId: number): Promise<{ id: number }[]> {
  const { data } = await api.get<{ id: number }[]>('/comments', {
    params: { authorId },
  })
  return data
}

export async function createComment(input: {
  postId: number
  content: string
}): Promise<void> {
  await api.post('/comments', input)
}
