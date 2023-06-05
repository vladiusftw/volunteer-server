import Events from "./mongoSchema.js";

const getEventsByCity = async (request, reply) => {
  const { city } = request.params;
  return { data: await Events.find({ city: new RegExp(city, "i") }) };
};

export { getEventsByCity };
