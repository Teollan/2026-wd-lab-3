import { makeRoute } from "@/core/route.js";
import { updatePostController } from "@/modules/post/controllers/updatePost.controller.js";

export const updatePostRoute = makeRoute({
  url: "/:id",
  method: "PATCH",
  controller: updatePostController,
});
