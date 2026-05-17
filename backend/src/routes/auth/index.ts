import { makeRouteGroup } from "@/core/route.js";
import { signUpRoute } from "@/routes/auth/signUp.route.js";
import { signInRoute } from "@/routes/auth/signIn.route.js";
import { meRoute } from "@/routes/auth/me.route.js";

export const authRoutes = makeRouteGroup("/auth", [signUpRoute, signInRoute, meRoute]);
