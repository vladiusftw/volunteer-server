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

const applyForNewEvent = async (request, reply) => {};

export { getEventsByCity, applyForNewEvent };
