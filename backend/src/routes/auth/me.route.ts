import { makeRoute } from "@/core/route.js";
import { meController } from "@/modules/auth/controllers/me.controller.js";

export const meRoute = makeRoute({
  url: "/me",
  method: "GET",
  controller: meController,
});
