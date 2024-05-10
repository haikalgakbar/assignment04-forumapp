const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  user_name: {
    type: String,
    require: true,
  },
  display_name: {
    type: String,
    require: true,
  },
  avatar_url: String,
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "forum_thread",
    },
  ],
});

const User = mongoose.model("forum_user", userSchema);

module.exports = User;
