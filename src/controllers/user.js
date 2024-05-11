const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const User = require("../models/user");

async function handleGetAllUser(_, res) {
  try {
    const users = await User.find();

    // console.log(users[0].bookmarks);
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: err });
  }
}

async function handleGetOneUser(req, res) {
  console.log(req.params.id);
  try {
    const id = req.params.id;
    // const User = mongoose.model("user_forum");
    // const users = await User.find().populate("bookmarks").exec();
    const user = await User.findById(id);
    // .populate("bookmarks")
    // .exec((err, user) => {
    //   if (err) {
    //     console.error("Error fetching user: ", err);
    //     return;
    //   }
    //   console.log("User: ", user);
    // });

    // user.populated("bookmarks");

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

module.exports = { handleGetAllUser, handleGetOneUser, handleUpdateUser };
