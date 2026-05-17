import { makeRouteGroup } from "@/core/route.js";
import { healthRoutes } from "@/routes/health/index.js";
import { authRoutes } from "@/routes/auth/index.js";
import { usersRoutes } from "@/routes/users/index.js";
import { postsRoutes } from "@/routes/posts/index.js";
import { commentsRoutes } from "@/routes/comments/index.js";

export const allRoutes = makeRouteGroup("/", [
  healthRoutes,
  authRoutes,
  usersRoutes,
  postsRoutes,
  commentsRoutes,
]);
