import { makeController } from "@/core/controller.js";
import { NotFound } from "@/core/httpError.js";
import { prisma } from "@/db.js";
import { parseId } from "@/lib/parseId.js";
import type { Comment } from "@/models/comment.js";

export const getCommentController = makeController<Comment>({
  handler: async ({ request }) => {
    const id = parseId((request.params as { id: string }).id);

    const comment = await prisma.comment.findUnique({ where: { id } });

    if (!comment) {
      throw new NotFound();
    }

    return comment;
  },
});
