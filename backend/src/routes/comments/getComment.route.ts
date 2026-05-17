import { makeRoute } from "@/core/route.js";
import { getCommentController } from "@/modules/comment/controllers/getComment.controller.js";

export const getCommentRoute = makeRoute({
  url: "/:id",
  method: "GET",
  controller: getCommentController,
});
