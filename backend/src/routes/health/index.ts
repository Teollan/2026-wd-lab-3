import { makeRouteGroup } from "@/core/route.js";
import { checkHealthRoute } from "@/routes/health/checkHealth.route.js";

export const healthRoutes = makeRouteGroup("/", [checkHealthRoute]);
