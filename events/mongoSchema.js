import mongoose from "mongoose";

const EventSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Events = mongoose.model("events", EventSchema);

export default Events;
