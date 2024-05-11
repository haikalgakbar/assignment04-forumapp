const mongoose = require("mongoose");
// const MONGO_URI = require("../config/db.js");
// mongoose.connect(MONGO_URI);
const Thread = require("../models/thread");
const User = require("../models/user");
const Session = require("../models/session");

async function handleGetThreads(_, res) {
  const threads = await Thread.find()
    .populate("sender")
    .populate([
      {
        path: "comments",
        transform: (comment) => (comment.length > 0 ? "" : comment),
      },
    ]);

  res.status(200).send(threads);
  // try {
  //   const threads = await Thread.find()
  //     .populate("sender")
  //     .populate([
  //       {
  //         path: "comments",
  //         transform: (comment) => (comment === null ? null : comment),
  //       },
  //     ]);

  //   res.status(200).send(threads);
  // } catch (err) {
  //   res.status(500).send({ message: err });
  // }
}

async function handleCreateThread(req, res) {
  const { title, content } = req.body;
  const cookies = req.cookies?.session;
  const findsender = await Session.findById(cookies).populate("user");
  const img = req.body.img ?? "";
  const sender = findsender.user._id;

  console.log(findsender.user._id);

  try {
    if (!mongoose.Types.ObjectId.isValid(sender))
      return res.status(400).send({ message: "Invalid sender." });

    if (!(await User.findById(sender)))
      return res.status(404).send({ message: "User not found." });

    if (!title || !content)
      return res
        .status(400)
        .send({ message: "Must include title or content." });

    if (typeof title !== "string" || typeof content !== "string")
      return res.status(400).send({ message: "Data must be string." });

    await new Thread({
      sender: sender,
      title: title,
      content: content,
      img: img,
    }).save();

    res.status(201).send("Add new thread success.");
  } catch (err) {
    res.status(500).send({ message: err });
  }
}

module.exports = { handleGetThreads, handleCreateThread };
