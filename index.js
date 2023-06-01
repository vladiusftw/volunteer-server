import fastifyEnv from "@fastify/env";
import Fastify from "fastify";
import mongoose from "mongoose";
import UsersRoutes from "./users/routes.js";

const fastify = Fastify({
  logger: true,
});

const envSchema = {
  type: "object",
  required: ["PORT", "MONGO_USERNAME", "MONGO_PASSWORD"],
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
  },
};
const options = {
  schema: envSchema,
  dotenv: true,
};

await fastify.register(fastifyEnv, options);

try {
  const url = `mongodb+srv://${fastify.config.MONGO_USERNAME}:${fastify.config.MONGO_PASSWORD}@cluster0.f0kpkbh.mongodb.net/${fastify.config.DB_NAME}?retryWrites=true&w=majority`;
  await mongoose.connect(url);
  console.log("connected");
} catch (e) {
  console.log(e);
}

await fastify.register(UsersRoutes);

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
