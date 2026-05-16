import Fastify from "fastify";
import cors from "@fastify/cors";
import { pingDb, prisma } from "./db.js";
import { usersRoutes } from "./routes/users.js";
import { postsRoutes } from "./routes/posts.js";
import { commentsRoutes } from "./routes/comments.js";

const PORT = Number(process.env.PORT ?? 3000);
const HOST = process.env.HOST ?? "127.0.0.1";

const app = Fastify({
  logger: true,
});

app.register(cors, {
  origin: process.env.FRONTEND_ORIGIN ?? true,
  methods: ["GET", "HEAD", "POST", "PATCH", "DELETE"],
});

app.get("/health", async (_request, reply) => {
  try {
    await pingDb();
    return { status: "ok", db: "up" };
  } catch (err) {
    app.log.error(err);
    return reply.status(503).send({ status: "degraded", db: "down" });
  }
});

app.register(usersRoutes, { prefix: "/users" });
app.register(postsRoutes, { prefix: "/posts" });
app.register(commentsRoutes, { prefix: "/comments" });

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
