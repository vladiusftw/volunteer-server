import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  events: [
    {
      eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events",
      },
      creation_date: { type: String },
    },
  ],
});

const Users = mongoose.model("users", UserSchema);

export default Users;
