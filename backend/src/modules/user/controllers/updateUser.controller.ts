import { makeController } from "@/core/controller.js";
import { Forbidden } from "@/core/httpError.js";
import { prisma } from "@/db.js";
import { hashPassword } from "@/lib/password.js";
import { parseId } from "@/lib/parseId.js";
import { toPublicUser, type User, type PublicUser, type UpdateUserInput } from "@/models/user.js";

export const updateUserController = makeController<PublicUser>({
  auth: true,
  handler: async ({ request, user }) => {
    const id = parseId((request.params as { id: string }).id);

    if (id !== user.id) {
      throw new Forbidden();
    }

    const body = (request.body ?? {}) as UpdateUserInput;

    const updated: User = await prisma.user.update({
      where: { id },
      data: {
        ...(body.email !== undefined && { email: body.email }),
        ...(body.password !== undefined && {
          password: await hashPassword(body.password),
        }),
        ...(body.username !== undefined && { username: body.username }),
        ...(body.dateOfBirth !== undefined && {
          dateOfBirth: new Date(body.dateOfBirth),
        }),
        ...(body.gender !== undefined && { gender: body.gender }),
        ...(body.bio !== undefined && { bio: body.bio }),
      },
    });

    return toPublicUser(updated);
  },
});
