import { makeRoute } from "@/core/route.js";
import { deleteCommentController } from "@/modules/comment/controllers/deleteComment.controller.js";

export const deleteCommentRoute = makeRoute({
  url: "/:id",
  method: "DELETE",
  controller: deleteCommentController,
});
