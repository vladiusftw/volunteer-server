const bodyRegisterUserSchema = {
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
};

const bodyLoginUserSchema = {
  type: "object",
  required: [],
  properties: {},
};

export { bodyRegisterUserSchema };
