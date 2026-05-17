import { makeRoute } from "@/core/route.js";
import { checkHealthController } from "@/modules/health/controllers/checkHealth.controller.js";

export const checkHealthRoute = makeRoute({
  url: "/health",
  method: "GET",
  controller: checkHealthController,
});
