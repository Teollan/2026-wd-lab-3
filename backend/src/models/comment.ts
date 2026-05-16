import type { PublicUser } from "./user.js";

export interface Comment {
  id: number;
  postId: number;
  authorId: number;
  content: string;
  createdAt: Date;
}

export interface CommentWithAuthor extends Comment {
  author: PublicUser;
}

export interface CreateCommentInput {
  postId: number;
  authorId: number;
  content: string;
}

export type UpdateCommentInput = Partial<Pick<CreateCommentInput, "content">>;
