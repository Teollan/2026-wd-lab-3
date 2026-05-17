import { makeRoute } from "@/core/route.js";
import { listUsersController } from "@/modules/user/controllers/listUsers.controller.js";

export const listUsersRoute = makeRoute({
  url: "/",
  method: "GET",
  controller: listUsersController,
});
