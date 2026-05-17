import type { PublicUser } from "@/models/user.js";
import type { CommentWithAuthor } from "@/models/comment.js";

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
