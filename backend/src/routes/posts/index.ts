import { makeRouteGroup } from "@/core/route.js";
import { createPostRoute } from "@/routes/posts/createPost.route.js";
import { listPostsRoute } from "@/routes/posts/listPosts.route.js";
import { getPostRoute } from "@/routes/posts/getPost.route.js";
import { updatePostRoute } from "@/routes/posts/updatePost.route.js";
import { deletePostRoute } from "@/routes/posts/deletePost.route.js";

export const postsRoutes = makeRouteGroup("/posts", [
  createPostRoute,
  listPostsRoute,
  getPostRoute,
  updatePostRoute,
  deletePostRoute,
]);
