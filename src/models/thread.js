const mongoose = require("mongoose");

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

const Thread = mongoose.model("forum_thread", threadSchema);

module.exports = Thread;
