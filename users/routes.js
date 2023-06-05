import mongoose from "mongoose";
import Users from "./mongoSchema.js";
import Events from "../events/mongoSchema.js";
import { loginUserSchema, registerUserSchema } from "./fastifySchema.js";
import { login, registerUser } from "./controller.js";

async function routes(fastify, options) {
  fastify.post("/register", registerUserSchema, registerUser);

  fastify.post("/login", loginUserSchema, login);
}

export default routes;
