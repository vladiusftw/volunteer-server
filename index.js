import fastifyEnv from "@fastify/env";
import Fastify from "fastify";
import mongoose from "mongoose";
import cors from "@fastify/cors";
import UsersRoutes from "./users/routes.js";
import fastifyJwt from "@fastify/jwt";

const fastify = Fastify({
  logger: true,
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

await fastify.register(fastifyJwt, { secret: fastify.config.SUPER_SECRET });

try {
  const url = `mongodb+srv://${fastify.config.MONGO_USERNAME}:${fastify.config.MONGO_PASSWORD}@cluster0.f0kpkbh.mongodb.net/${fastify.config.DB_NAME}?retryWrites=true&w=majority`;
  await mongoose.connect(url);
  console.log("connected");
} catch (e) {
  console.log(e);
}

await fastify.register(UsersRoutes, { prefix: "/api" });

// Run the server!
fastify.listen({ port: fastify.config.PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});

export { fastify };
