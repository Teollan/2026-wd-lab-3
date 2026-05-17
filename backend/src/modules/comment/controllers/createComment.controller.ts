import { makeController } from "@/core/controller.js";
import { BadRequest } from "@/core/httpError.js";
import { prisma } from "@/db.js";
import type { Comment } from "@/models/comment.js";

interface CreateCommentBody {
  postId: number;
  content: string;
}

export const createCommentController = makeController<Comment>({
  auth: true,
  handler: async ({ request, user }) => {
    const { postId, content } = (request.body ?? {}) as CreateCommentBody;

    if (!postId || !content) {
      throw new BadRequest("Missing required fields");
    }

    return prisma.comment.create({
      data: { postId, authorId: user.id, content },
    });
  },
});
