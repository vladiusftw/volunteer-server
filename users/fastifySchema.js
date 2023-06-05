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
      200: {
        description: "User Registered",
        type: "object",
        properties: {
          data: {
            type: "string",
            example: "Registration complete",
          },
        },
      },
      400: {
        description: "An Error has occured",
        type: "object",
        properties: {
          data: {
            type: "string",
            example: "Error",
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
      200: {
        description: "Login Successful",
        type: "object",
        properties: {
          token: {
            type: "string",
            example: "token1234",
          },
        },
      },
      400: {
        description: "Invalid email/password",
        type: "object",
        properties: {
          data: {
            type: "string",
            example: "Invalid email/password",
          },
        },
      },
    },
  },
};

export { registerUserSchema, loginUserSchema };
