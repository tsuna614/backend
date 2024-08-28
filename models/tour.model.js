const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: [String],
        required: true
    },
    city: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true
    },
});

const Tour = mongoose.model("tours", tourSchema);

module.exports = Tour;