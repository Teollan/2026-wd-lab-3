import { makeRoute } from "@/core/route.js";
import { signUpController } from "@/modules/auth/controllers/signUp.controller.js";

export const signUpRoute = makeRoute({
  url: "/sign-up",
  method: "POST",
  controller: signUpController,
});
