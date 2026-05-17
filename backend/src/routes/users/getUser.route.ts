import { makeRoute } from "@/core/route.js";
import { getUserController } from "@/modules/user/controllers/getUser.controller.js";

export const getUserRoute = makeRoute({
  url: "/:id",
  method: "GET",
  controller: getUserController,
});
