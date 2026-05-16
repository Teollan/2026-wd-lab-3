import type { FastifyInstance } from "fastify";
import { prisma } from "../db.js";
import { handlePrismaError } from "../lib/prismaError.js";
import { authenticate } from "../lib/auth.js";
import { type Comment } from "../models/comment.js";

interface CreateCommentBody {
  postId: number;
  content: string;
}

type UpdateCommentBody = Partial<Pick<CreateCommentBody, "content">>;

function parseId(raw: string): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function commentsRoutes(app: FastifyInstance) {
  app.post<{ Body: CreateCommentBody }>(
    "/",
    { preHandler: authenticate },
    async (request, reply) => {
      const { postId, content } = request.body ?? {};

      if (!postId || !content) {
        return reply.status(400).send({ error: "Missing required fields" });
      }

      try {
        const comment: Comment = await prisma.comment.create({
          data: { postId, authorId: request.user.id, content },
        });

        return reply.status(201).send(comment);
      } catch (err) {
        if (handlePrismaError(err, reply)) return;
        throw err;
      }
    },
  );

  app.get<{ Querystring: { postId?: string; authorId?: string } }>(
    "/",
    async (request): Promise<Comment[]> => {
      const postIdRaw = request.query.postId;
      const authorIdRaw = request.query.authorId;
      const postId = postIdRaw ? Number(postIdRaw) : undefined;
      const authorId = authorIdRaw ? Number(authorIdRaw) : undefined;

      return prisma.comment.findMany({
        where: {
          ...(postId !== undefined && { postId }),
          ...(authorId !== undefined && { authorId }),
        },
        orderBy: { createdAt: "desc" },
      });
    },
  );

  app.get<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const id = parseId(request.params.id);
    if (id === null) return reply.status(400).send({ error: "Invalid id" });

    const comment: Comment | null = await prisma.comment.findUnique({
      where: { id },
    });
    if (!comment) return reply.status(404).send({ error: "Not found" });

    return comment;
  });

  app.patch<{ Params: { id: string }; Body: UpdateCommentBody }>(
    "/:id",
    { preHandler: authenticate },
    async (request, reply) => {
      const id = parseId(request.params.id);
      if (id === null) return reply.status(400).send({ error: "Invalid id" });

      const existing = await prisma.comment.findUnique({ where: { id } });
      if (!existing) return reply.status(404).send({ error: "Not found" });
      if (existing.authorId !== request.user.id) {
        return reply.status(403).send({ error: "Forbidden" });
      }

      const body = request.body ?? {};

      const comment: Comment = await prisma.comment.update({
        where: { id },
        data: {
          ...(body.content !== undefined && { content: body.content }),
        },
      });

      return comment;
    },
  );

  app.delete<{ Params: { id: string } }>(
    "/:id",
    { preHandler: authenticate },
    async (request, reply) => {
      const id = parseId(request.params.id);
      if (id === null) return reply.status(400).send({ error: "Invalid id" });

      const existing = await prisma.comment.findUnique({ where: { id } });
      if (!existing) return reply.status(404).send({ error: "Not found" });
      if (existing.authorId !== request.user.id) {
        return reply.status(403).send({ error: "Forbidden" });
      }

      try {
        await prisma.comment.delete({ where: { id } });
        return reply.status(204).send();
      } catch (err) {
        if (handlePrismaError(err, reply)) return;
        throw err;
      }
    },
  );
}
