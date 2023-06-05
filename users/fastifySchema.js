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

export { registerUserSchema, loginUserSchema };
