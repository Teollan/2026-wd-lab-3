import { makeRoute } from "@/core/route.js";
import { deleteUserController } from "@/modules/user/controllers/deleteUser.controller.js";

export const deleteUserRoute = makeRoute({
  url: "/:id",
  method: "DELETE",
  controller: deleteUserController,
});
