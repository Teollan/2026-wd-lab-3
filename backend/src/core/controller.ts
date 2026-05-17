import { FastifyRequest } from "fastify";
import { Unauthorized } from "@/core/httpError.js";

export type Controller<Output> = (request: FastifyRequest) => Promise<Output>;

interface AuthedContext {
  request: FastifyRequest;
  user: { id: number };
}

interface AnonContext {
  request: FastifyRequest;
  user: null;
}

interface AuthedOptions<Output> {
  auth: true;
  handler: (ctx: AuthedContext) => Promise<Output>;
}

interface AnonOptions<Output> {
  auth?: false;
  handler: (ctx: AnonContext) => Promise<Output>;
}

export function makeController<Output>(options: AuthedOptions<Output>): Controller<Output>;
export function makeController<Output>(options: AnonOptions<Output>): Controller<Output>;
export function makeController<Output>(
  options: AuthedOptions<Output> | AnonOptions<Output>,
): Controller<Output> {
  return async (request: FastifyRequest): Promise<Output> => {
    if (options.auth) {
      try {
        await request.jwtVerify();
      } catch {
        throw new Unauthorized();
      }

      return options.handler({ request, user: request.user });
    }

    return options.handler({ request, user: null });
  };
}
