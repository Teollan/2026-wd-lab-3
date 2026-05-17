import { makeController } from "@/core/controller.js";
import { NotFound } from "@/core/httpError.js";
import { prisma } from "@/db.js";
import { parseId } from "@/lib/parseId.js";
import type { PostWithRelations } from "@/models/post.js";
import { WITH_RELATIONS, toPostWithRelations } from "@/modules/post/relations.js";

export const getPostController = makeController<PostWithRelations>({
  handler: async ({ request }) => {
    const id = parseId((request.params as { id: string }).id);

    const post = await prisma.post.findUnique({
      where: { id },
      ...WITH_RELATIONS,
    });

    if (!post) {
      throw new NotFound();
    }

    return toPostWithRelations(post);
  },
});
