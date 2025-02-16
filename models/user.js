const mongoose = require("mongoose");

const gamesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
  },
});

const listsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  games: [gamesSchema],
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lists: [listsSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
