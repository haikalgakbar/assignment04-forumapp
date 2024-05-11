const express = require("express");
const authRouter = express();
const authController = require("../controllers/auth.js");

authRouter.post("/auth/register", authController.handleRegister);
authRouter.post("/auth/login", authController.handleLogin);
authRouter.get("/auth/logout", authController.handleLogout);

module.exports = authRouter;
