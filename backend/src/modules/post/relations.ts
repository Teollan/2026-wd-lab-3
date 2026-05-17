import { toPublicUser, type User } from "@/models/user.js";
import type { Post, PostWithRelations } from "@/models/post.js";
import type { Comment, CommentWithAuthor } from "@/models/comment.js";

export const WITH_RELATIONS = {
  include: {
    author: true,
    comments: {
      include: { author: true },
      orderBy: { createdAt: "desc" },
    },
  },
} as const;

type CommentRow = Comment & { author: User };
type PostRow = Post & { author: User; comments: CommentRow[] };

export function toPostWithRelations(post: PostRow): PostWithRelations {
  return {
    id: post.id,
    authorId: post.authorId,
    title: post.title,
    content: post.content,
    createdAt: post.createdAt,
    author: toPublicUser(post.author),
    comments: post.comments.map(
      (c): CommentWithAuthor => ({
        id: c.id,
        postId: c.postId,
        authorId: c.authorId,
        content: c.content,
        createdAt: c.createdAt,
        author: toPublicUser(c.author),
      }),
    ),
  };
}
