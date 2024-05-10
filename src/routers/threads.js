const mongoose = require("mongoose");
const express = require("express");
const router_thread = express();
const { User, Thread } = require("../models/forum.js");

router_thread.get("/threads", async (_, res) => {
  try {
    const threads = await Thread.find()
      .populate("sender")
      .populate({ path: "comments", populate: { path: "user" } })
      .virtualPopulate("user.comments");
    res.send(threads);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

router_thread.post("/threads", async (req, res) => {
  const { sender, title, content } = req.body;
  const img = req.body.img ?? "";

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
});

router_thread.post("/thread/:id", async (req, res) => {
  const id = req.params.id;
  const { user, comment } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).send({ message: "Invalid thread id" });

    if (!mongoose.Types.ObjectId.isValid(user))
      return res.status(400).send({ message: "Invalid user id" });

    if (!comment)
      return res.status(400).send({ message: "Must include comment." });

    if (typeof comment !== "string")
      return res.status(400).send({ message: "Comment must be string." });

    await Thread.updateOne(
      { _id: id },
      { $push: { comments: { user: user, comment: comment } } }
    );

    res.send({ message: "Add new comment success." });
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

module.exports = router_thread;
