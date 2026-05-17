import { makeController } from "@/core/controller.js";
import { ServiceUnavailable } from "@/core/httpError.js";
import { pingDb } from "@/db.js";

export const checkHealthController = makeController<{ status: string; db: string }>({
  handler: async () => {
    try {
      await pingDb();
    } catch {
      throw new ServiceUnavailable("Database unavailable");
    }

    return { status: "ok", db: "up" };
  },
});
