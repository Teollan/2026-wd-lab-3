import { makeRoute } from "@/core/route.js";
import { getPostController } from "@/modules/post/controllers/getPost.controller.js";

export const getPostRoute = makeRoute({
  url: "/:id",
  method: "GET",
  controller: getPostController,
});
