const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
    required: true,
  },
  userFriends: {
    type: Array,
    required: true,
  },
  language: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;