import { makeRouteGroup } from "@/core/route.js";
import { listUsersRoute } from "@/routes/users/listUsers.route.js";
import { getUserRoute } from "@/routes/users/getUser.route.js";
import { updateUserRoute } from "@/routes/users/updateUser.route.js";
import { deleteUserRoute } from "@/routes/users/deleteUser.route.js";

export const usersRoutes = makeRouteGroup("/users", [
  listUsersRoute,
  getUserRoute,
  updateUserRoute,
  deleteUserRoute,
]);
