const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const User = require("../models/user");
const Thread = require("../models/thread");
const { isValidObjectId, isString } = require("./util.js");

async function handleGetAllUser(_, res) {
  try {
    res.status(200).send(await User.find());
  } catch (err) {
    res.status(500).send({ message: err });
  }
}

async function handleGetOneUser(req, res) {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).send({ message: "Invalid id" });

    if (!id) return res.status(400).send({ message: "User id is required" });

    const user = await User.findById(id);

    if (!user) return res.status(404).send({ message: "User not found" });

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err });
  }
}

async function handleUpdateUser(req, res) {
  try {
    const { email, password, user_name, display_name, avatar_url } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send({ message: "Invalid id" });

    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).send({ message: "User not found" });

    if (email) user.email = email;
    if (password) user.password = await bycrypt.hash(password, 12);
    if (user_name) user.user_name = user_name;
    if (display_name) user.display_name = display_name;
    if (avatar_url) user.avatar_url = avatar_url;

    await user.save();

    res.status(201).json({ message: "User updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err });
  }
}

async function handleAddBookmark(req, res) {
  try {
    const { thread } = req.body;

    if (!thread)
      return res.status(400).json({ message: "Body should contain thread." });

    if (!isString(thread))
      return res.status(400).send({ message: "Body must be string." });

    if (!isValidObjectId(req.params.id) || !isValidObjectId(req.body.thread))
      return res.status(400).send({ message: "Invalid id." });

    if (!(await User.findById(req.params.id)))
      return res.status(404).send({ message: "User not found" });

    if (!(await Thread.findById({ _id: thread })))
      return res.status(404).send({ message: "Thread not found" });

    if (await User.findOne({ _id: req.params.id, bookmarks: thread }))
      return res.status(403).json({ message: "Already bookmarked." });

    await User.updateOne(
      { _id: req.params.id },
      {
        $push: { bookmarks: thread },
      }
    );

    return res.status(201).json({ message: "Bookmark added." });
  } catch (err) {
    res.status(500).json({ message: err.stack });
  }
}

async function handleRemoveBookmark(req, res) {
  try {
    const { thread } = req.body;

    if (!thread)
      return res.status(400).json({ message: "Body should contain thread." });

    if (!isString(thread))
      return res.status(400).send({ message: "Body must be string." });

    if (!isValidObjectId(req.params.id) || !isValidObjectId(req.body.thread))
      return res.status(400).send({ message: "Invalid id." });

    if (!(await User.findById(req.params.id)))
      return res.status(404).send({ message: "User not found." });

    if (!(await Thread.findById({ _id: thread })))
      return res.status(404).send({ message: "Thread not found." });

    if (!(await User.findOne({ _id: req.params.id, bookmarks: thread })))
      return res
        .status(403)
        .json({ message: "No saved bookmark with this id." });

    await User.updateOne(
      { _id: req.params.id },
      {
        $pull: { bookmarks: thread },
      }
    );

    return res.status(201).json({ message: "Bookmark removed." });
  } catch (err) {
    res.status(500).json({ message: err.stack });
  }
}

module.exports = {
  handleGetAllUser,
  handleGetOneUser,
  handleUpdateUser,
  handleAddBookmark,
  handleRemoveBookmark,
};
