import { makeController } from "@/core/controller.js";
import { prisma } from "@/db.js";
import { toPublicUser, type User, type PublicUser } from "@/models/user.js";

export const listUsersController = makeController<PublicUser[]>({
  handler: async () => {
    const users: User[] = await prisma.user.findMany();

    return users.map(toPublicUser);
  },
});
