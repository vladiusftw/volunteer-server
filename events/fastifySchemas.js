import Events from "./mongoSchema.js";

const getEventByCitySchema = {
  schema: {
    params: {
      type: "object",
      required: ["city"],
      properties: {
        city: {
          type: "string",
          minLength: 1,
        },
      },
    },
    response: {
      200: {
        description: "Event Retrieved",
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                desc: {
                  type: "string",
                },
                host: {
                  type: "string",
                },
                country: {
                  type: "string",
                },
                city: {
                  type: "string",
                },
                area: {
                  type: "string",
                },
                start_date: {
                  type: "string",
                },
                end_date: {
                  type: "string",
                },
                wage: {
                  type: "number",
                },
                start_time: {
                  type: "string",
                },
                end_time: {
                  type: "string",
                },
                min_age: {
                  type: "number",
                },
              },
            },
          },
        },
      },
    },
  },
};

export { getEventByCitySchema };
