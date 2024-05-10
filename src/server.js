const express = require("express");
const app = express();
const mongoose = require("mongoose");

const router_auth = require("./routers/auth.js");
const router_user = require("./routers/users.js");
const router_thread = require("./routers/threads.js");

mongoose.connect(process.env.MONGO_URI);

app.listen(process.env.PORT);

// Middleware
app.use(express.json());
app.use(router_auth);
app.use(router_user);
app.use(router_thread);
