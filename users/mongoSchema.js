import mongoose from "mongoose";

const subSchema = mongoose.Schema({
  _id: false,
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "events",
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
  },
});

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  events: [subSchema],
});

const Users = mongoose.model("users", UserSchema);

export default Users;
