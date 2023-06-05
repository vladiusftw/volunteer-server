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
              password: {
                type: "string",
              },
              occupation: {
                type: "string",
              },
              nationality: {
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
                        name: { type: "string", nullable: true },
                        desc: { type: "string", nullable: true },
                        host: { type: "string", nullable: true },
                        country: { type: "string", nullable: true },
                        city: { type: "string", nullable: true },
                        area: { type: "string", nullable: true },
                        start_date: { type: "string", nullable: true },
                        end_date: { type: "string", nullable: true },
                        wage: { type: "number", nullable: true },
                        start_time: { type: "string", nullable: true },
                        end_time: { type: "string", nullable: true },
                        min_age: { type: "number", nullable: true },
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
