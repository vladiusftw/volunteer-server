import mongoose from "mongoose";
import Users from "./mongoSchema.js";
import Events from "../events/mongoSchema.js";
import { loginUserSchema, registerUserSchema, getUserByIdSchema } from "./fastifySchema.js";
import { login, registerUser, getUserById } from "./controller.js";

async function routes(fastify, options) {
  fastify.post("/register", registerUserSchema, registerUser);

  fastify.post("/login", loginUserSchema, login);

  fastify.get("/users/user", {...getUserByIdSchema, onRequest: [fastify.authenticate]}, getUserById);
}

export default routes;
