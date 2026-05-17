import { makeController } from "@/core/controller.js";
import { prisma } from "@/db.js";
import type { PostWithRelations } from "@/models/post.js";
import { WITH_RELATIONS, toPostWithRelations } from "@/modules/post/relations.js";

export const listPostsController = makeController<PostWithRelations[]>({
  handler: async ({ request }) => {
    const authorIdRaw = (request.query as { authorId?: string }).authorId;
    const authorId = authorIdRaw ? Number(authorIdRaw) : undefined;

    const posts = await prisma.post.findMany({
      where: authorId ? { authorId } : undefined,
      orderBy: { createdAt: "desc" },
      ...WITH_RELATIONS,
    });

    return posts.map(toPostWithRelations);
  },
});
