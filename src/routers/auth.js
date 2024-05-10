const express = require("express");
const router_auth = express();
const authController = require("../controllers/auth.js");

router_auth.post("/auth/register", async (req, res) =>
  authController.handleRegister(req, res)
);

router_auth.post("/auth/login", async (req, res) =>
  authController.handleLogin(req, res)
);

module.exports = router_auth;
