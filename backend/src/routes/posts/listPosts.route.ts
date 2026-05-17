import { makeRoute } from "@/core/route.js";
import { listPostsController } from "@/modules/post/controllers/listPosts.controller.js";

export const listPostsRoute = makeRoute({
  url: "/",
  method: "GET",
  controller: listPostsController,
});
