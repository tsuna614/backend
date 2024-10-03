const mongoose = require("mongoose");
const User = require("./user.model");

bookSchema = new mongoose.Schema(
  {
    travelId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    bookedDate: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("books", bookSchema);

module.exports = Book;
