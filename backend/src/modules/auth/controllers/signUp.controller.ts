import { makeController } from "@/core/controller.js";
import { BadRequest } from "@/core/httpError.js";
import { prisma } from "@/db.js";
import { hashPassword } from "@/lib/password.js";
import { toPublicUser, type User, type PublicUser } from "@/models/user.js";

interface SignUpBody {
  email: string;
  password: string;
  username: string;
  dateOfBirth: string;
  gender: string;
  bio: string;
}

const TOKEN_TTL = "7d";

export const signUpController = makeController<{ token: string; user: PublicUser }>({
  handler: async ({ request }) => {
    const { email, password, username, dateOfBirth, gender, bio } = (request.body ??
      {}) as SignUpBody;

    if (!email || !password || !username || !dateOfBirth || !gender || !bio) {
      throw new BadRequest("Missing required fields");
    }

    const user: User = await prisma.user.create({
      data: {
        email,
        password: await hashPassword(password),
        username,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        bio,
      },
    });

    const token = request.server.jwt.sign({ id: user.id }, { expiresIn: TOKEN_TTL });

    return { token, user: toPublicUser(user) };
  },
});
