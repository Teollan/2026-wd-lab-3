import type { FastifyInstance } from "fastify";
import { prisma } from "../db.js";
import { hashPassword, verifyPassword } from "../lib/password.js";
import { handlePrismaError } from "../lib/prismaError.js";
import { authenticate } from "../lib/auth.js";
import { type CreateUserInput, type User, toPublicUser } from "../models/user.js";

const TOKEN_TTL = "7d";

interface SignInBody {
  email: string;
  password: string;
}

export async function authRoutes(app: FastifyInstance) {
  app.post<{ Body: CreateUserInput }>("/sign-up", async (request, reply) => {
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

      const token = app.jwt.sign({ id: user.id }, { expiresIn: TOKEN_TTL });

      return reply.status(201).send({ token, user: toPublicUser(user) });
    } catch (err) {
      if (handlePrismaError(err, reply)) return;
      throw err;
    }
  });

  app.post<{ Body: SignInBody }>("/sign-in", async (request, reply) => {
    const { email, password } = request.body ?? {};

    if (!email || !password) {
      return reply.status(400).send({ error: "Missing required fields" });
    }

    const user: User | null = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await verifyPassword(password, user.password))) {
      return reply.status(401).send({ error: "Invalid email or password" });
    }

    const token = app.jwt.sign({ id: user.id }, { expiresIn: TOKEN_TTL });

    return { token, user: toPublicUser(user) };
  });

  app.get("/me", { preHandler: authenticate }, async (request, reply) => {
    const user: User | null = await prisma.user.findUnique({
      where: { id: request.user.id },
    });

    if (!user) {
      return reply.status(404).send({ error: "Not found" });
    }

    return toPublicUser(user);
  });
}
