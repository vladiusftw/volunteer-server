import {
  loginUserSchema,
  registerUserSchema,
  getUserByIdSchema,
} from "./fastifySchema.js";
import { login, registerUser, getUserById } from "./controller.js";
import { checkIfClient } from "../validators/index.js";

async function routes(fastify, options) {
  fastify.post("/register", registerUserSchema, registerUser);

  fastify.post("/login", loginUserSchema, login);

  fastify.get(
    "/users/user",
    {
      ...getUserByIdSchema,
      onRequest: [fastify.authenticate],
      preHandler: [checkIfClient],
    },
    getUserById
  );
}

export default routes;
