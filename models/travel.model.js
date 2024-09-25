const mongoose = require("mongoose");

const travelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: [String],
    required: true,
  },
  travelType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
  // tour
  destination: {
    type: String,
    required: false,
  },
  duration: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  capacity: {
    type: Number,
    required: false,
  },
  // hotel
  address: {
    type: String,
    required: false,
  },
  contact: {
    type: String,
    required: false,
  },
  // flight
  origin: {
    type: String,
    required: false,
  },
  departureTime: {
    type: String,
    required: false,
  },
  arrivalTime: {
    type: String,
    required: false,
  },
  airline: {
    type: String,
    required: false,
  },
  // car rental
  location: {
    type: String,
    required: false,
  },
  carType: {
    type: String,
    required: false,
  },
});

const Travel = mongoose.model("travels", travelSchema);

module.exports = Travel;
