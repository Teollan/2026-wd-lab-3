import { makeController } from "@/core/controller.js";
import { NotFound } from "@/core/httpError.js";
import { prisma } from "@/db.js";
import { parseId } from "@/lib/parseId.js";
import { toPublicUser, type User, type PublicUser } from "@/models/user.js";

export const getUserController = makeController<PublicUser>({
  handler: async ({ request }) => {
    const id = parseId((request.params as { id: string }).id);

    const user: User | null = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFound();
    }

    return toPublicUser(user);
  },
});
