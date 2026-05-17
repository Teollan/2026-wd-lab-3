import { FastifyInstance, HTTPMethods } from "fastify";
import { Controller } from "@/core/controller.js";

interface RouteOptions<Output> {
  url: string;
  method: HTTPMethods;
  controller: Controller<Output>;
}

export const makeRoute = <Output>({ url, method, controller }: RouteOptions<Output>) => {
  return async (app: FastifyInstance) => {
    app.route({
      url,
      method,
      handler: (request) => controller(request),
    });
  };
};

export const makeRouteGroup = (prefix: string, routes: ReturnType<typeof makeRoute>[]) => {
  return async (app: FastifyInstance) => {
    app.register(
      async (groupApp) => {
        for (const route of routes) {
          await route(groupApp);
        }
      },
      { prefix },
    );
  };
};
