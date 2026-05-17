import { makeRoute } from "@/core/route.js";
import { deletePostController } from "@/modules/post/controllers/deletePost.controller.js";

export const deletePostRoute = makeRoute({
  url: "/:id",
  method: "DELETE",
  controller: deletePostController,
});
