import type { FastifyInstance } from "fastify";
import { prisma } from "../db.js";
import { handlePrismaError } from "../lib/prismaError.js";
import {
  type CreateCommentInput,
  type UpdateCommentInput,
  type Comment,
} from "../models/comment.js";

function parseId(raw: string): number | null {
  const id = Number(raw);

  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function commentsRoutes(app: FastifyInstance) {
  app.post<{ Body: CreateCommentInput }>("/", async (request, reply) => {
    const { postId, authorId, content } = request.body ?? {};

    if (!postId || !authorId || !content) {
      return reply.status(400).send({ error: "Missing required fields" });
    }

    try {
      const comment: Comment = await prisma.comment.create({
        data: { postId, authorId, content },
      });

      return reply.status(201).send(comment);
    } catch (err) {
      if (handlePrismaError(err, reply)) return;
      throw err;
    }
  });

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

    const comment: Comment | null = await prisma.comment.findUnique({ where: { id } });
    if (!comment) return reply.status(404).send({ error: "Not found" });

    return comment;
  });

  app.patch<{ Params: { id: string }; Body: UpdateCommentInput }>(
    "/:id",
    async (request, reply) => {
      const id = parseId(request.params.id);
      if (id === null) return reply.status(400).send({ error: "Invalid id" });

      const body = request.body ?? {};

      try {
        const comment: Comment = await prisma.comment.update({
          where: { id },
          data: {
            ...(body.content !== undefined && { content: body.content }),
          },
        });

        return comment;
      } catch (err) {
        if (handlePrismaError(err, reply)) return;
        throw err;
      }
    },
  );

  app.delete<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const id = parseId(request.params.id);
    if (id === null) return reply.status(400).send({ error: "Invalid id" });

    try {
      await prisma.comment.delete({ where: { id } });
      return reply.status(204).send();
    } catch (err) {
      if (handlePrismaError(err, reply)) return;
      throw err;
    }
  });
}
