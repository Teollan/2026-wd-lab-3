import { makeController } from "@/core/controller.js";
import { NotFound } from "@/core/httpError.js";
import { prisma } from "@/db.js";
import { toPublicUser, type User, type PublicUser } from "@/models/user.js";

export const meController = makeController<PublicUser>({
  auth: true,
  handler: async ({ user }) => {
    const found: User | null = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!found) {
      throw new NotFound();
    }

    return toPublicUser(found);
  },
});
