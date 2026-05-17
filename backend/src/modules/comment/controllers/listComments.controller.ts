import { makeController } from "@/core/controller.js";
import { prisma } from "@/db.js";
import type { Comment } from "@/models/comment.js";

export const listCommentsController = makeController<Comment[]>({
  handler: async ({ request }) => {
    const query = request.query as { postId?: string; authorId?: string };
    const postId = query.postId ? Number(query.postId) : undefined;
    const authorId = query.authorId ? Number(query.authorId) : undefined;

    return prisma.comment.findMany({
      where: {
        ...(postId !== undefined && { postId }),
        ...(authorId !== undefined && { authorId }),
      },
      orderBy: { createdAt: "desc" },
    });
  },
});
