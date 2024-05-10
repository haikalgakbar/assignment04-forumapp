const express = require("express");
const authRouter = express();
const authController = require("../controllers/auth.js");

authRouter.post("/auth/register", authController.handleRegister);

authRouter.post("/auth/login", authController.handleLogin);

module.exports = authRouter;
