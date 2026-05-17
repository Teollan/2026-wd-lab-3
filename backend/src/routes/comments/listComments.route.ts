import { makeRoute } from "@/core/route.js";
import { listCommentsController } from "@/modules/comment/controllers/listComments.controller.js";

export const listCommentsRoute = makeRoute({
  url: "/",
  method: "GET",
  controller: listCommentsController,
});
