import type { FastifyRequest, FastifyReply } from "fastify";

/**
 * preHandler that rejects the request with 401 unless it carries a valid JWT.
 * On success, `request.user` is populated with the token payload.
 */
export async function authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    await request.jwtVerify();
  } catch {
    reply.status(401).send({ error: "Unauthorized" });
  }
}
