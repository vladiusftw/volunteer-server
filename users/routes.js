import mongoose from "mongoose";
import Users from "./mongoSchema.js";
import Events from "../events/mongoSchema.js";
import { bodyRegisterUserSchema } from "./fastifySchema.js";
import { registerUser } from "./controller.js";

async function routes(fastify, options) {
  fastify.post(
    "/register",
    { schema: { body: bodyRegisterUserSchema } },
    registerUser
  );

  fastify.post("/login");
}

export default routes;
