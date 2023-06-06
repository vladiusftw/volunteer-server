import mongoose from "mongoose";
import Users from "../users/mongoSchema.js";
import Events from "./mongoSchema.js";

const getEventsByCity = async (request, reply) => {
  try {
    const { city } = request.params;
    return { data: await Events.find({ city: new RegExp(city, "i") }) };
  } catch (e) {
    reply.code(400);
    return { data: e.message };
  }
};

const applyForNewEventPreHandler = async (request, reply) => {
  try {
    const { event_id } = request.body;
    const { id } = request.user;

    const event = await Events.findById(event_id);
    if (!event) {
      reply.code(400);
      reply.send({ data: "Event does not exist!" });
    }

    const user = await Users.findOne(
      { _id: id },
      { events: { $elemMatch: { event_id: event_id } } }
    );
    if (!user) {
      reply.code(400);
      reply.send({ data: "User ID does not exist!" });
    }
    if (user?.events?.length > 0) {
      reply.code(400);
      reply.send({ data: "Event Already Exists!" });
    }
  } catch (e) {
    reply.code(400);
    reply.send({ data: e.message });
  }
};

const applyForNewEvent = async (request, reply) => {
  try {
    const { event_id } = request.body;
    const { id } = request.user;

    await Users.updateOne(
      { _id: id },
      {
        $addToSet: {
          events: { event_id, completed: false, start_date: new Date() },
        },
      }
    );
    return { data: "Event added!" };
  } catch (e) {
    reply.code(400);
    return { data: e.message };
  }
};

const checkIfEventForHost = async (request, reply) => {
  const { id } = request.user;
  const { event_id } = request.params;

  const event = await Events.findById(event_id);
  if (!event) {
    reply.code(400);
    reply.send({ data: "Event does not exist!" });
  }
  console.log(event);
  console.log(id);
  if (event["host_id"] != id) {
    reply.code(400);
    reply.send({ data: "You do not own this event" });
  }
};

const getUsersByEvent = async (request, reply) => {
  try {
    const { event_id } = request.params;

    const users = await Users.find({
      role: "client",
      events: { $elemMatch: { event_id: event_id } },
    });
    return { data: users };
  } catch (e) {
    reply.code(400);
    reply.send({ data: e.message });
  }
};

export {
  getEventsByCity,
  applyForNewEventPreHandler,
  applyForNewEvent,
  checkIfEventForHost,
  getUsersByEvent,
};
