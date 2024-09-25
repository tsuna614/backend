const mongoose = require("mongoose");

postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    likes: {
      type: [String],
      required: false,
    },
    comments: {
      type: [String],
      required: false,
    },
    shares: {
      type: [String],
      required: false,
    },
    // from here is for review posts only
    rating: {
      type: Number,
      required: false,
    },
    travelId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("posts", postSchema);

module.exports = { Post, postSchema };
