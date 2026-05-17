import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { prisma } from "@/db.js";
import { registerErrorHandler } from "@/core/errorHandler.js";
import { allRoutes } from "@/routes/index.js";

const PORT = Number(process.env.PORT ?? 3000);
const HOST = process.env.HOST ?? "127.0.0.1";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

const app = Fastify({
  logger: true,
});

app.register(cors, {
  origin: process.env.FRONTEND_ORIGIN ?? true,
  methods: ["GET", "HEAD", "POST", "PATCH", "DELETE"],
});

app.register(jwt, { secret: JWT_SECRET });

registerErrorHandler(app);

app.register(allRoutes);

app.addHook("onClose", async () => {
  await prisma.$disconnect();
});

async function start() {
  try {
    await app.listen({ port: PORT, host: HOST });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
