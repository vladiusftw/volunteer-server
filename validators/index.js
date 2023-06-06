const checkIfClient = async (request, reply) => {
  try {
    const { role } = request.user;
    if (role != "client") {
      reply.code(400);
      reply.send({ data: "You have no permissions to this route" });
    }
  } catch (e) {
    reply.code(400);
    return { data: e.message };
  }
};

const checkIfHost = async (request, reply) => {
  try {
    const { role } = request.user;
    if (role != "host") {
      reply.code(400);
      reply.send({ data: "You have no permissions to this route" });
    }
  } catch (e) {
    reply.code(400);
    return { data: e.message };
  }
};

export { checkIfClient, checkIfHost };
