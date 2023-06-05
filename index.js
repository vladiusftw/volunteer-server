import fastifyEnv from "@fastify/env";
import Fastify from "fastify";
import mongoose from "mongoose";
import cors from "@fastify/cors";
import UsersRoutes from "./users/routes.js";
import EventsRoutes from "./events/routes.js";
import fastifyJwt from "@fastify/jwt";
import fastifyBcrypt from "fastify-bcrypt";
import Swagger from "@fastify/swagger";
import SwaggerUI from "@fastify/swagger-ui";

const fastify = Fastify({
  logger: true,
});

await fastify.register(Swagger, {});
await fastify.register(SwaggerUI, {
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "Volunteer Now Docs",
      description: "Documentation for the Volunteer Now API",
      version: "0.1.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host: "localhost",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      { name: "user", description: "User related end-points" },
      { name: "code", description: "Code related end-points" },
    ],
    // definitions: {
    //   User: {
    //     type: 'object',
    //     required: ['id', 'email'],
    //     properties: {
    //       id: { type: 'string', format: 'uuid' },
    //       firstName: { type: 'string' },
    //       lastName: { type: 'string' },
    //       email: {type: 'string', format: 'email' }
    //     }
    //   }
    // },
    // securityDefinitions: {
    //   apiKey: {
    //     type: "apiKey",
    //     name: "apiKey",
    //     in: "header",
    //   },
    // },
  },
});

const envSchema = {
  type: "object",
  required: [
    "PORT",
    "MONGO_USERNAME",
    "MONGO_PASSWORD",
    "DB_NAME",
    "FRONTEND_URL",
    "SUPER_SECRET",
    "SALT_WORK_FACTOR",
  ],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
    MONGO_USERNAME: {
      type: "string",
    },
    MONGO_PASSWORD: {
      type: "string",
    },
    DB_NAME: {
      type: "string",
    },
    FRONTEND_URL: {
      type: "string",
      default: "https://localhost",
    },
    SUPER_SECRET: {
      type: "string",
    },
    SALT_WORK_FACTOR: {
      type: "string",
      default: 10,
    },
  },
};
const options = {
  schema: envSchema,
  dotenv: true,
};

await fastify.register(fastifyEnv, options);

await fastify.register(cors, {
  origin: fastify.config.FRONTEND_URL,
});

await fastify.register(fastifyBcrypt, {
  saltWorkFactor: 6,
});

await fastify.register(fastifyJwt, { secret: fastify.config.SUPER_SECRET });

fastify.decorate("authenticate", async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

try {
  const url = `mongodb+srv://${fastify.config.MONGO_USERNAME}:${fastify.config.MONGO_PASSWORD}@cluster0.f0kpkbh.mongodb.net/${fastify.config.DB_NAME}?retryWrites=true&w=majority`;
  await mongoose.connect(url);
  console.log("connected");
} catch (e) {
  console.log(e);
}

await fastify.register(UsersRoutes, { prefix: "/api" });

await fastify.register(EventsRoutes, { prefix: "/api" });

// Run the server!
fastify.listen({ port: fastify.config.PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});

fastify.swagger();

export { fastify };
