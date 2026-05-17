import { makeController } from "@/core/controller.js";
import { BadRequest } from "@/core/httpError.js";
import { prisma } from "@/db.js";
import type { Post } from "@/models/post.js";

interface CreatePostBody {
  title: string;
  content: string;
}

export const createPostController = makeController<Post>({
  auth: true,
  handler: async ({ request, user }) => {
    const { title, content } = (request.body ?? {}) as CreatePostBody;

    if (!title || !content) {
      throw new BadRequest("Missing required fields");
    }

    return prisma.post.create({
      data: { authorId: user.id, title, content },
    });
  },
});
