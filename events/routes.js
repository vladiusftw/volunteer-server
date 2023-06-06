import { checkIfHost } from "../validators/index.js";
import {
  getEventsByCity,
  applyForNewEvent,
  applyForNewEventPreHandler,
  getUsersByEvent,
  checkIfEventForHost,
} from "./controller.js";
import {
  applyForNewEventSchema,
  getEventByCitySchema,
  getUsersByEventSchema,
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

  fastify.get(
    "/events/:event_id/users",
    {
      ...getUsersByEventSchema,
      onRequest: [fastify.authenticate],
      preHandler: [checkIfHost, checkIfEventForHost],
    },
    getUsersByEvent
  );
}

export default routes;
