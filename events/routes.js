import { getEventsByCity } from "./controller.js";
import { getEventByCitySchema } from "./fastifySchemas.js";

async function routes(fastify, options) {
  fastify.get(
    "/events/:city",
    { ...getEventByCitySchema, onRequest: [fastify.authenticate] },
    getEventsByCity
  );
}

export default routes;
