const express = require("express");
const threadRouter = express();
const threadController = require("../controllers/thread.js");

threadRouter.get("/api/threads", threadController.handleGetThreads);
threadRouter.post("/api/threads", threadController.handleCreateThread);
threadRouter.post("/api/threads/:id", threadController.handleCreateComment);

module.exports = threadRouter;
