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

const threadSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "forum_user",
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  img: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "forum_comment",
    },
  ],
});

const commentSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "forum_user",
    require: true,
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "forum_thread",
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
});

// threadSchema.virtual("user.comments", {
//   ref: "user_forum",
//   localField: "comments.user",
//   foreignField: "_id",
// });

const User = mongoose.model("forum_user", userSchema);
const Thread = mongoose.model("forum_thread", threadSchema);
const Comment = mongoose.model("forum_comment", commentSchema);

module.exports = { User, Thread, Comment };
