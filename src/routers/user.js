const express = require("express");
const userRouter = express();
const userController = require("../controllers/user.js");

userRouter.get("/api/users", userController.handleGetAllUser);
userRouter.get("/api/users/:id", userController.handleGetOneUser);
userRouter.patch("/api/users/:id", userController.handleUpdateUser);
userRouter.post("/api/users/:id/bookmarks", userController.handleAddBookmark);
userRouter.delete(
  "/api/users/:id/bookmarks",
  userController.handleRemoveBookmark
);

module.exports = userRouter;
