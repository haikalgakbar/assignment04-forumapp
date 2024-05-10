const mongoose = require("mongoose");

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

const Comment = mongoose.model("forum_comment", commentSchema);

module.exports = Comment;
