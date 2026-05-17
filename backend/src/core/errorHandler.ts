import type { FastifyInstance } from "fastify";
import { HttpError } from "@/core/httpError.js";

const PRISMA_STATUS: Record<string, { status: number; message: string }> = {
  P2025: { status: 404, message: "Not found" },
  P2002: { status: 409, message: "Unique constraint violation" },
  P2003: { status: 400, message: "Related record does not exist" },
};

export function registerErrorHandler(app: FastifyInstance): void {
  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof HttpError) {
      reply.status(error.status).send({ error: error.message });
      return;
    }

    const prismaCode = (error as { code?: string }).code;
    const mapped = prismaCode ? PRISMA_STATUS[prismaCode] : undefined;

    if (mapped) {
      reply.status(mapped.status).send({ error: mapped.message });
      return;
    }

    app.log.error(error);
    reply.status(500).send({ error: "Internal server error" });
  });
}
