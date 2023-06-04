import { fastify } from "../index.js";
import Users from "./mongoSchema.js";

const registerUser = async (response, reply) => {
  try {
    const { name, dob, phone, email, password, occupation, nationality } =
      response.body;
    const date = new Date(dob);
    if (date.toString().toLowerCase() == "invalid date") {
      reply.code(400);
      return { data: "Invalid Date" };
    }
    const hashedPassword = await fastify.bcrypt.hash(password);
    await Users.create({
      name,
      dob,
      phone,
      email,
      password: hashedPassword,
      occupation,
      nationality,
    });
    return { data: "Registration complete" };
  } catch (e) {
    reply.code(400);
    return { data: e.toString() };
  }
};

const login = async (request, reply) => {};

export { registerUser };
