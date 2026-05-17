import { makeController } from "@/core/controller.js";
import { Forbidden, NotFound } from "@/core/httpError.js";
import { prisma } from "@/db.js";
import { parseId } from "@/lib/parseId.js";
import type { Post } from "@/models/post.js";

interface UpdatePostBody {
  title?: string;
  content?: string;
}

export const updatePostController = makeController<Post>({
  auth: true,
  handler: async ({ request, user }) => {
    const id = parseId((request.params as { id: string }).id);

    const existing = await prisma.post.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFound();
    }

    if (existing.authorId !== user.id) {
      throw new Forbidden();
    }

    const body = (request.body ?? {}) as UpdatePostBody;

    return prisma.post.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.content !== undefined && { content: body.content }),
      },
    });
  },
});
