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

const login = async (request, reply) => {
  try {
    const { email, password } = request.body;
    const user = await Users.findOne({ email });
    const match = await fastify.bcrypt.compare(password, user.password);
    if (match) {
      const token = fastify.jwt.sign({ id: user["_id"] });
      return { token };
    }
    reply.code(400);
    return { data: "Invalid email/password" };
  } catch (e) {
    reply.code(400);
    return { data: e.toString() };
  }
};

export { registerUser, login };
