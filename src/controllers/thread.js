const Thread = require("../models/thread");
const Session = require("../models/session");

async function handleGetThreads(_, res) {
  try {
    const threads = await Thread.find().populate({
      path: "sender",
      transform: (user) => {
        return {
          _id: user._id,
          email: user.email,
          user_name: user.user_name,
          display_name: user.display_name,
          avatar_url: user.avatar_url,
        };
      },
    });
    // .populate({
    //   path: "comments",
    //   transform: (comment) => (comment.length > 0 ? "" : comment),
    // });

    // console.log(threads[0].sender);

    res.status(200).send(threads);
  } catch (err) {
    res.status(500).send({ message: err });
  }
}

async function handleCreateThread(req, res) {
  try {
    const { title, content } = req.body;

    if (!title || !content)
      return res.status(400).send({ message: "Invalid request." });

    if (typeof title !== "string" || typeof content !== "string")
      return res.status(400).send({ message: "Data must be string." });

    const img =
      typeof req.body.img === "string" && req.body.img.length > 0
        ? req.body.img
        : "";

    const { user: sender } = await Session.findById(req.cookies.session);

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

async function handleCreateComment(req, res) {}

module.exports = { handleGetThreads, handleCreateThread, handleCreateComment };
