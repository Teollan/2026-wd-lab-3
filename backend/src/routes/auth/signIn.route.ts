import { makeRoute } from "@/core/route.js";
import { signInController } from "@/modules/auth/controllers/signIn.controller.js";

export const signInRoute = makeRoute({
  url: "/sign-in",
  method: "POST",
  controller: signInController,
});
