const bycrypt = require("bcrypt");
const User = require("../models/user");
const Thread = require("../models/thread");
const { isValidObjectId, isString } = require("./util.js");

async function handleGetAllUser(_, res) {
  try {
    const users = await User.find().populate([
      {
        path: "bookmarks",
        transform: (thread) => {
          return {
            _id: thread._id,
            sender: thread.sender,
            title: thread.title,
            content: thread.content,
          };
        },
        populate: {
          path: "sender",
          transform: (sender) => {
            return {
              _id: sender._id,
              user_name: sender.user_name,
              display_name: sender.display_name,
              avatar_url: sender.avatar_url,
            };
          },
        },
      },
    ]);

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function handleUpdateUser(req, res) {
  try {
    const { email, password, user_name, display_name, avatar_url } = req.body;

    if (!isValidObjectId(req.params.id))
      return res.status(400).json({ message: "Invalid id" });

    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (email) user.email = email;
    if (password) user.password = await bycrypt.hash(password, 12);
    if (user_name) user.user_name = user_name;
    if (display_name) user.display_name = display_name;
    if (avatar_url) user.avatar_url = avatar_url;

    await user.save();

    res.status(201).json({ message: "User updated successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function handleAddBookmark(req, res) {
  try {
    const { thread } = req.body;

    if (!thread)
      return res.status(400).json({ message: "Body should contain thread." });

    if (!isString(thread))
      return res.status(400).json({ message: "Body must be string." });

    if (!isValidObjectId(req.params.id) || !isValidObjectId(req.body.thread))
      return res.status(400).json({ message: "Invalid id." });

    if (!(await User.findById(req.params.id)))
      return res.status(404).json({ message: "User not found" });

    if (!(await Thread.findById({ _id: thread })))
      return res.status(404).json({ message: "Thread not found" });

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
    res.status(500).json({ message: err.message });
  }
}

async function handleRemoveBookmark(req, res) {
  try {
    const { thread } = req.body;

    if (!thread)
      return res.status(400).json({ message: "Body should contain thread." });

    if (!isString(thread))
      return res.status(400).json({ message: "Body must be string." });

    if (!isValidObjectId(req.params.id) || !isValidObjectId(req.body.thread))
      return res.status(400).json({ message: "Invalid id." });

    if (!(await User.findById(req.params.id)))
      return res.status(404).json({ message: "User not found." });

    if (!(await Thread.findById({ _id: thread })))
      return res.status(404).json({ message: "Thread not found." });

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
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  handleGetAllUser,
  handleUpdateUser,
  handleAddBookmark,
  handleRemoveBookmark,
};
