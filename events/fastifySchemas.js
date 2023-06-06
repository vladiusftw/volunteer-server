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
                host_id: {
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

const applyForNewEventSchema = {
  schema: {
    body: {
      type: "object",
      required: ["event_id"],
      properties: {
        event_id: {
          type: "string",
        },
      },
    },
    response: {
      200: {
        description: "Applied for Event!",
        type: "object",
        properties: {
          data: {
            type: "string",
            example: "Applied for Red Fest",
          },
        },
      },
    },
  },
};

const getUsersByEventSchema = {
  schema: {
    params: {
      type: "object",
      required: ["event_id"],
      properties: {
        event_id: {
          type: "string",
          minLength: 1,
        },
      },
    },
    response: {
      200: {
        description: "Users Obtained!",
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
                dob: {
                  type: "string",
                },
                phone: {
                  type: "number",
                },
                email: {
                  type: "string",
                },
                occupation: {
                  type: "string",
                },
                nationality: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};

export { getEventByCitySchema, applyForNewEventSchema, getUsersByEventSchema };
