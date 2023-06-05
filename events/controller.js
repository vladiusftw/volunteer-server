import mongoose from "mongoose";
import Users from "../users/mongoSchema.js";
import Events from "./mongoSchema.js";

const getEventsByCity = async (request, reply) => {
  try {
    const { city } = request.params;
    return { data: await Events.find({ city: new RegExp(city, "i") }) };
  } catch (e) {
    reply.code(400);
    return { data: e.toString() };
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
    reply.send({ data: e.toString() });
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
    return { data: e.toString() };
  }
};

export { getEventsByCity, applyForNewEventPreHandler, applyForNewEvent };
