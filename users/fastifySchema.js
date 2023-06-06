const registerUserSchema = {
  schema: {
    body: {
      type: "object",
      required: [
        "name",
        "dob",
        "phone",
        "email",
        "password",
        "occupation",
        "nationality",
        "role",
      ],
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
        password: {
          type: "string",
          minLength: 8,
        },
        occupation: {
          type: "string",
        },
        nationality: {
          type: "string",
        },
        role: {
          type: "string",
        },
      },
    },

    response: {
      201: {
        description: "User Registered",
        type: "object",
        properties: {
          data: {
            type: "string",
            example: "Registration complete",
          },
        },
      },
    },
  },
};

const loginUserSchema = {
  schema: {
    body: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    },
    response: {
      201: {
        description: "Login Successful",
        type: "object",
        properties: {
          token: {
            type: "string",
            example: "token1234",
          },
        },
      },
    },
  },
};

const getUserByIdSchema = {
  schema: {
    response: {
      200: {
        description: "User info obtained",
        type: "object",
        properties: {
          data: {
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
              role: {
                type: "string",
              },
              events: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    event_id: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        desc: { type: "string" },
                        host_id: { type: "string" },
                        country: { type: "string" },
                        city: { type: "string" },
                        area: { type: "string" },
                        start_date: { type: "string" },
                        end_date: { type: "string" },
                        wage: { type: "number" },
                        start_time: { type: "string" },
                        end_time: { type: "string" },
                        min_age: { type: "number" },
                      },
                    },
                    completed: {
                      type: "boolean",
                    },
                    start_date: {
                      type: "string",
                    },
                    end_date: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export { registerUserSchema, loginUserSchema, getUserByIdSchema };
