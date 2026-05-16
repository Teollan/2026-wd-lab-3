import type { User } from '@/models/User'

export interface Comment {
  id: number
  postId: number
  authorId: number
  content: string
  createdAt: Date
}

export interface CommentDto {
  id: number
  postId: number
  authorId: number
  content: string
  createdAt: string
}

export interface CommentWithAuthor extends Comment {
  author: User
}

export const mapCommentDtoToComment = (dto: CommentDto): Comment => ({
  ...dto,
  createdAt: new Date(dto.createdAt),
})
