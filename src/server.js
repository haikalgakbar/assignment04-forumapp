const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const mongoose = require("mongoose");
const MONGO_URI = require("./config/db.js");

// Routers
const authRouter = require("./routers/auth.js");
const userRouter = require("./routers/user.js");
const threadRouter = require("./routers/thread.js");

// Middlewares
const checkForSession = require("./middlewares/checkForSession.js");

mongoose.connect(MONGO_URI);

app.listen(process.env.PORT);

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/api/", checkForSession);

app.use(authRouter);
app.use(userRouter);
app.use(threadRouter);
