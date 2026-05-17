import { makeRouteGroup } from "@/core/route.js";
import { createCommentRoute } from "@/routes/comments/createComment.route.js";
import { listCommentsRoute } from "@/routes/comments/listComments.route.js";
import { getCommentRoute } from "@/routes/comments/getComment.route.js";
import { updateCommentRoute } from "@/routes/comments/updateComment.route.js";
import { deleteCommentRoute } from "@/routes/comments/deleteComment.route.js";

export const commentsRoutes = makeRouteGroup("/comments", [
  createCommentRoute,
  listCommentsRoute,
  getCommentRoute,
  updateCommentRoute,
  deleteCommentRoute,
]);
