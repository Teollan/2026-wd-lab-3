import { makeController } from "@/core/controller.js";
import { Forbidden } from "@/core/httpError.js";
import { prisma } from "@/db.js";
import { parseId } from "@/lib/parseId.js";
import { toPublicUser, type User, type PublicUser } from "@/models/user.js";

export const deleteUserController = makeController<PublicUser>({
  auth: true,
  handler: async ({ request, user }) => {
    const id = parseId((request.params as { id: string }).id);

    if (id !== user.id) {
      throw new Forbidden();
    }

    const deleted: User = await prisma.user.delete({ where: { id } });

    return toPublicUser(deleted);
  },
});
