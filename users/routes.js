const {sayHi} = require("./controller");

async function routes (fastify, options) {
    fastify.get('/', sayHi);
}

module.exports = routes