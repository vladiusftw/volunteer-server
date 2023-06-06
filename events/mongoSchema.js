import mongoose from "mongoose";

const EventSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  host_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  wage: {
    type: Number,
  },
  start_time: {
    type: Date,
  },
  end_time: {
    type: Date,
  },
  min_age: {
    type: Number,
  },
});

const Events = mongoose.model("events", EventSchema);

export default Events;
