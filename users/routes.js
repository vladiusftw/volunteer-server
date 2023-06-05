import { loginUserSchema, registerUserSchema } from "./fastifySchema.js";
import { login, registerUser } from "./controller.js";

async function routes(fastify, options) {
  fastify.post("/register", registerUserSchema, registerUser);

  fastify.post("/login", loginUserSchema, login);
}

export default routes;
