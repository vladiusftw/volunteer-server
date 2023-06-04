import { fastify } from "../index.js";
import Users from "./mongoSchema.js";

const registerUser = async (response, reply) => {
  try {
    const { name, dob, phone, email, occupation, nationality } = response.body;
    const date = new Date(dob);
    if (date.toString().toLowerCase() == "invalid date") {
      reply.code(400);
      return { data: "Invalid Date" };
    }
    const user = await Users.create({
      name,
      dob,
      phone,
      email,
      occupation,
      nationality,
    });
    const token = fastify.jwt.sign({ id: user["_id"] });
    return { token };
  } catch (e) {
    reply.code(400);
    return { data: e.toString() };
  }
};

export { registerUser };
