import { makeRoute } from "@/core/route.js";
import { createCommentController } from "@/modules/comment/controllers/createComment.controller.js";

export const createCommentRoute = makeRoute({
  url: "/",
  method: "POST",
  controller: createCommentController,
});
