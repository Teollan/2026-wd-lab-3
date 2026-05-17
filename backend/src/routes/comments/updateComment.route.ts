import { makeRoute } from "@/core/route.js";
import { updateCommentController } from "@/modules/comment/controllers/updateComment.controller.js";

export const updateCommentRoute = makeRoute({
  url: "/:id",
  method: "PATCH",
  controller: updateCommentController,
});
