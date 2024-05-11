const Thread = require("../models/thread");
const Session = require("../models/session");
const Comment = require("../models/comment");
const { default: mongoose } = require("mongoose");

async function handleGetThreads(_, res) {
  try {
    const threads = await Thread.find()
      .populate({
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
      })
      .populate([
        {
          path: "comments",
          transform: (comment) => {
            return {
              _id: comment._id,
              sender: comment.sender,
              content: comment.content,
            };
          },
          populate: {
            path: "sender",
            transform: (user) => {
              return {
                user_name: user.user_name,
                display_name: user.display_name,
                avatar_url: user.avatar_url,
              };
            },
          },
        },
      ]);

    res.status(200).json(threads);
  } catch (err) {
    res.status(500).json({ message: err.stack });
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

async function handleCreateComment(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send({ message: "Invalid thread id." });

    if (!(await Thread.findById(req.params.id)))
      return res.status(404).send({ message: "Thread not found." });

    if (Object.keys(req.body).length === 0)
      return res.status(400).send({ message: "Invalid request." });

    const { content } = req.body;

    if (typeof content !== "string")
      return res.status(400).send({ message: "Data must be string." });

    const { user: sender } = await Session.findById(req.cookies.session);

    const newComment = await new Comment({
      sender: sender,
      thread: req.params.id,
      content: content,
    }).save();

    await Thread.updateOne(
      { _id: req.params.id },
      { $push: { comments: newComment._id } }
    );

    return res.status(201).json({ message: "Add new comment success." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error.", detail: err.stack });
  }
}

module.exports = { handleGetThreads, handleCreateThread, handleCreateComment };
