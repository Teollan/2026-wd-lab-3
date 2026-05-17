import { makeRoute } from "@/core/route.js";
import { updateUserController } from "@/modules/user/controllers/updateUser.controller.js";

export const updateUserRoute = makeRoute({
  url: "/:id",
  method: "PATCH",
  controller: updateUserController,
});
