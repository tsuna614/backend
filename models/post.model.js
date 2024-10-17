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
    contentType: {
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
    // this is for review posts only
    rating: {
      type: Number,
      required: false,
    },
    travelId: {
      type: String,
      required: false,
    },
    // this is for comment posts only
    postId: {
      type: String,
      required: false,
    },
    // this is for share posts only
    sharedPostId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Post = mongoose.model("posts", postSchema);

module.exports = { Post, postSchema };
