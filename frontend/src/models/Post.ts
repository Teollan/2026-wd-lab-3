import type { User } from '@/models/User'
import type { CommentWithAuthor } from '@/models/Comment'

export interface Post {
  id: number
  authorId: number
  title: string
  content: string
  createdAt: Date
}

export interface PostDto {
  id: number
  authorId: number
  title: string
  content: string
  createdAt: string
}

export interface PostWithAuthorAndComments extends Post {
  author: User
  comments: CommentWithAuthor[]
}

export const mapPostDtoToPost = (dto: PostDto): Post => ({
  ...dto,
  createdAt: new Date(dto.createdAt),
})
