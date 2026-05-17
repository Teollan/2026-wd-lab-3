import { makeController } from "@/core/controller.js";
import { BadRequest, Unauthorized } from "@/core/httpError.js";
import { prisma } from "@/db.js";
import { verifyPassword } from "@/lib/password.js";
import { toPublicUser, type User, type PublicUser } from "@/models/user.js";

interface SignInBody {
  email: string;
  password: string;
}

const TOKEN_TTL = "7d";

export const signInController = makeController<{ token: string; user: PublicUser }>({
  handler: async ({ request }) => {
    const { email, password } = (request.body ?? {}) as SignInBody;

    if (!email || !password) {
      throw new BadRequest("Missing required fields");
    }

    const user: User | null = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await verifyPassword(password, user.password))) {
      throw new Unauthorized("Invalid email or password");
    }

    const token = request.server.jwt.sign({ id: user.id }, { expiresIn: TOKEN_TTL });

    return { token, user: toPublicUser(user) };
  },
});
