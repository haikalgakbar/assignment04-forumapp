const express = require("express");
const threadRouter = express();
const threadController = require("../controllers/thread.js");

threadRouter.get("/api/threads", threadController.handleGetThreads);
threadRouter.post("/api/threads", threadController.handleCreateThread);
threadRouter.post("/api/threads/:id", threadController.handleCreateComment);

// threadRouter.post("/thread/:id", async (req, res) => {
//   const id = req.params.id;
//   const { user, comment } = req.body;

//   try {
//     if (!mongoose.Types.ObjectId.isValid(id))
//       return res.status(400).send({ message: "Invalid thread id" });

//     if (!mongoose.Types.ObjectId.isValid(user))
//       return res.status(400).send({ message: "Invalid user id" });

//     if (!comment)
//       return res.status(400).send({ message: "Must include comment." });

//     if (typeof comment !== "string")
//       return res.status(400).send({ message: "Comment must be string." });

//     await Thread.updateOne(
//       { _id: id },
//       { $push: { comments: { user: user, comment: comment } } }
//     );

//     res.send({ message: "Add new comment success." });
//   } catch (err) {
//     res.status(500).send({ message: err });
//   }
// });

module.exports = threadRouter;
