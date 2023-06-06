import { fastify } from "../index.js";
import Users from "./mongoSchema.js";

const registerUser = async (response, reply) => {
  try {
    const { name, dob, phone, email, password, occupation, nationality, role } =
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
      role,
    });
    reply.code(201);
    return { data: "Registration complete" };
  } catch (e) {
    reply.code(400);
    if (e?.code == 11000) return { data: "Email already exists!" };
    return { data: e.message };
  }
};

const login = async (request, reply) => {
  try {
    const { email, password } = request.body;
    const user = await Users.findOne({ email });
    const match = await fastify.bcrypt.compare(password, user.password);
    if (match) {
      const token = fastify.jwt.sign({ id: user["_id"], role: user["role"] });
      reply.code(201);
      return { token };
    }
    reply.code(400);
    return { data: "Invalid email/password" };
  } catch (e) {
    reply.code(400);
    return { data: e.message };
  }
};

const getUserById = async (request, reply) => {
  try {
    const { id } = request.user;
    const user = await Users.findById({ _id: id }).populate("events.event_id");

    return { data: user };
  } catch (e) {
    reply.code(400);
    return { data: e.message };
  }
};

export { registerUser, login, getUserById };
