import { makeController } from "@/core/controller.js";
import { Forbidden, NotFound } from "@/core/httpError.js";
import { prisma } from "@/db.js";
import { parseId } from "@/lib/parseId.js";
import type { Comment } from "@/models/comment.js";

interface UpdateCommentBody {
  content?: string;
}

export const updateCommentController = makeController<Comment>({
  auth: true,
  handler: async ({ request, user }) => {
    const id = parseId((request.params as { id: string }).id);

    const existing = await prisma.comment.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFound();
    }

    if (existing.authorId !== user.id) {
      throw new Forbidden();
    }

    const body = (request.body ?? {}) as UpdateCommentBody;

    return prisma.comment.update({
      where: { id },
      data: {
        ...(body.content !== undefined && { content: body.content }),
      },
    });
  },
});
