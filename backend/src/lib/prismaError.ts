import type { FastifyReply } from "fastify";

interface PrismaLikeError {
  code?: string;
}

/**
 * Maps common Prisma error codes to HTTP responses.
 * Returns true if the error was handled and a response was sent.
 */
export function handlePrismaError(err: unknown, reply: FastifyReply): boolean {
  const code = (err as PrismaLikeError)?.code;

  switch (code) {
    case "P2025":
      reply.status(404).send({ error: "Not found" });
      return true;
    case "P2002":
      reply.status(409).send({ error: "Unique constraint violation" });
      return true;
    case "P2003":
      reply.status(400).send({ error: "Related record does not exist" });
      return true;
    default:
      return false;
  }
}
