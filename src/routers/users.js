const express = require("express");
const router_user = express();
// const { User, Thread, Comment } = require("../models/forum.js");
const { default: mongoose } = require("mongoose");

// router_user.get("/users", async (_, res) => {
//   // try {
//   //   const users = await User.find();
//   //   res.status(200).send(users);
//   // } catch (err) {
//   //   res.status(500).send({ message: err });
//   // }

//   // const users = await User.find().populate("bookmarks").exec();
//   const users = await User.find().populate("bookmarks");
//   res.status(200).send(users);
// });

// router_user.get("/user/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     // const User = mongoose.model("user_forum");
//     // const users = await User.find().populate("bookmarks").exec();
//     const user = await User.findById(id)
//       .populate("bookmarks")
//       .exec((err, user) => {
//         if (err) {
//           console.error("Error fetching user: ", err);
//           return;
//         }
//         console.log("User: ", user);
//       });

//     // user.populated("bookmarks");

//     res.status(200).send(user);
//   } catch (err) {
//     res.status(500).send({ message: err });
//   }
// });

// router_user.patch("/user/:id", async (req, res) => {
//   const id = req.params.id;
//   console.log(req.body);
//   const { email, password, user_name, display_name, avatar_url, bookmarks } =
//     req.body;

//   try {
//     if (!mongoose.Types.ObjectId.isValid(id))
//       return res.status(400).send({ message: "Invalid id" });

//     const user = await User.findById(id);

//     if (!user) return res.status(404).send({ message: "User not found" });

//     if (email) user.email = email;
//     if (password) user.password = password;
//     if (user_name) user.user_name = user_name;
//     if (display_name) user.display_name = display_name;
//     if (avatar_url) user.avatar_url = avatar_url;

//     // await user.save();

//     res.status(201).json({ message: "Update user success." });
//   } catch (err) {
//     res.status(500).send({ message: err });
//   }
// });

// router_user.patch("/user/:id/bookmarks", async (req, res) => {
//   if (Object.keys(req.body).length === 0)
//     return res.status(400).send({ message: "Invalid request." });

//   if (req.body.task !== "add" && req.body.task !== "remove")
//     return res.status(400).send({ message: "Invalid task." });

//   const id = req.params.id;
//   const { task, thread } = req.body;

//   try {
//     if (!mongoose.Types.ObjectId.isValid(id))
//       return res.status(400).send({ message: "Invalid id" });

//     if (!mongoose.Types.ObjectId.isValid(thread))
//       return res.status(400).send({ message: "Invalid thread id" });

//     if (!(await User.findById(id)))
//       return res.status(404).send({ message: "User not found" });

//     if (!(await Thread.findById(thread)))
//       return res.status(404).send({ message: "Thread not found" });

//     if (task === "add") {
//       await User.updateOne(
//         {
//           _id: id,
//         },
//         {
//           $push: {
//             bookmarks: thread,
//           },
//         }
//       );

//       res.status(201).json({ message: "Bookmark added." });
//     } else if (task === "remove") {
//       await User.updateOne({ _id: id }, { $pull: { bookmarks: thread } });

//       res.status(201).json({ message: "Bookmark removed." });
//     } else {
//       return res.status(400).send({ message: "Invalid task" });
//     }
//   } catch (err) {
//     res.status(500).send({ message: err });
//   }
// });

module.exports = router_user;
