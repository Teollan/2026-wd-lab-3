import type { FastifyInstance } from "fastify";
import { prisma } from "../db.js";
import { hashPassword } from "../lib/password.js";
import { handlePrismaError } from "../lib/prismaError.js";
import {
  type CreateUserInput,
  type UpdateUserInput,
  type PublicUser,
  type User,
  toPublicUser,
} from "../models/user.js";

function parseId(raw: string): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function usersRoutes(app: FastifyInstance) {
  app.post<{ Body: CreateUserInput }>("/", async (request, reply) => {
    const { email, password, username, dateOfBirth, gender, bio } = request.body ?? {};

    if (!email || !password || !username || !dateOfBirth || !gender || !bio) {
      return reply.status(400).send({ error: "Missing required fields" });
    }

    try {
      const user: User = await prisma.user.create({
        data: {
          email,
          password: await hashPassword(password),
          username,
          dateOfBirth: new Date(dateOfBirth),
          gender,
          bio,
        },
      });

      return reply.status(201).send(toPublicUser(user));
    } catch (err) {
      if (handlePrismaError(err, reply)) return;
      throw err;
    }
  });

  app.get("/", async (): Promise<PublicUser[]> => {
    const users: User[] = await prisma.user.findMany();
    return users.map(toPublicUser);
  });

  app.get<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const id = parseId(request.params.id);
    if (id === null) return reply.status(400).send({ error: "Invalid id" });

    const user: User | null = await prisma.user.findUnique({ where: { id } });
    if (!user) return reply.status(404).send({ error: "Not found" });

    return toPublicUser(user);
  });

  app.patch<{ Params: { id: string }; Body: UpdateUserInput }>("/:id", async (request, reply) => {
    const id = parseId(request.params.id);
    if (id === null) return reply.status(400).send({ error: "Invalid id" });

    const body = request.body ?? {};

    try {
      const user: User = await prisma.user.update({
        where: { id },
        data: {
          ...(body.email !== undefined && { email: body.email }),
          ...(body.password !== undefined && {
            password: await hashPassword(body.password),
          }),
          ...(body.username !== undefined && { username: body.username }),
          ...(body.dateOfBirth !== undefined && {
            dateOfBirth: new Date(body.dateOfBirth),
          }),
          ...(body.gender !== undefined && { gender: body.gender }),
          ...(body.bio !== undefined && { bio: body.bio }),
        },
      });

      return toPublicUser(user);
    } catch (err) {
      if (handlePrismaError(err, reply)) return;
      throw err;
    }
  });

  app.delete<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const id = parseId(request.params.id);
    if (id === null) return reply.status(400).send({ error: "Invalid id" });

    try {
      await prisma.user.delete({ where: { id } });
      return reply.status(204).send();
    } catch (err) {
      if (handlePrismaError(err, reply)) return;
      throw err;
    }
  });
}
