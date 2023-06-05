import {
  getEventsByCity,
  applyForNewEvent,
  applyForNewEventPreHandler,
} from "./controller.js";
import {
  applyForNewEventSchema,
  getEventByCitySchema,
} from "./fastifySchemas.js";

async function routes(fastify, options) {
  fastify.get(
    "/events/:city",
    { ...getEventByCitySchema, onRequest: [fastify.authenticate] },
    getEventsByCity
  );

  fastify.put(
    "/users/user/events",
    {
      ...applyForNewEventSchema,
      onRequest: [fastify.authenticate],
      preHandler: [applyForNewEventPreHandler],
    },
    applyForNewEvent
  );
}

export default routes;
