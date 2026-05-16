import type { PublicUser } from "./user.js";
import type { CommentWithAuthor } from "./comment.js";

export interface Post {
  id: number;
  authorId: number;
  title: string;
  content: string;
  createdAt: Date;
}

export interface PostWithRelations extends Post {
  author: PublicUser;
  comments: CommentWithAuthor[];
}

export interface CreatePostInput {
  authorId: number;
  title: string;
  content: string;
}

export type UpdatePostInput = Partial<Pick<CreatePostInput, "title" | "content">>;
