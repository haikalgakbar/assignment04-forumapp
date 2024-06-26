const bycrypt = require("bcrypt");
const User = require("../models/user");
const Session = require("../models/session");
const { isString } = require("./util");

async function handleRegister(req, res) {
  try {
    const { email, password, user_name, display_name } = req.body;
    const avatar_url = req.body.avatar_url ?? "";

    if (!email || !password || !user_name || !display_name)
      return res.status(400).json({ message: "Invalid body request." });

    if (
      !isString(email) ||
      !isString(password) ||
      !isString(user_name) ||
      !isString(display_name)
    )
      return res
        .status(400)
        .json({ message: "Request body must be in string." });

    if (await User.findOne({ email }))
      return res.status(409).json({ message: "Email already exists." });

    await new User({
      email,
      password: await bycrypt.hash(password, 12),
      user_name,
      display_name,
      avatar_url,
    }).save();

    return res.status(201).json({ message: "Add new user success." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Invalid body request." });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "Incorrect email or password." });

    if (!(await bycrypt.compare(password, user.password))) {
      return res.status(404).json({ message: "Incorrect email or password." });
    }

    const session = await new Session({ user: user._id }).save();

    return res
      .cookie("session", session._id)
      .status(200)
      .json({ message: "Login success." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function handleLogout(req, res) {
  try {
    await Session.findOneAndDelete(req.cookies.session);

    return res
      .clearCookie("session", {
        path: "/",
        domain: "localhost",
      })
      .status(201)
      .json({ message: "Logout success." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = { handleRegister, handleLogin, handleLogout };
