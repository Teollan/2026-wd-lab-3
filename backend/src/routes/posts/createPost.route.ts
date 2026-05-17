import { makeRoute } from "@/core/route.js";
import { createPostController } from "@/modules/post/controllers/createPost.controller.js";

export const createPostRoute = makeRoute({
  url: "/",
  method: "POST",
  controller: createPostController,
});
