const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Session = require("../models/session");

async function handleRegister(req, res) {
  const { email, password, user_name, display_name } = req.body;
  const avatar_url = req.body.avatar_url ?? "";

  if (!email || !password || !user_name || !display_name)
    return res.status(400).send({ message: "Invalid body request." });

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof user_name !== "string" ||
    typeof display_name !== "string"
  )
    return res.status(400).send({ message: "Request body must be in string." });

  if (await User.findOne({ email }))
    return res.status(409).send({ message: "Email already exists." });

  try {
    await new User({
      email,
      password: await bycrypt.hash(password, 12),
      user_name,
      display_name,
      avatar_url,
    }).save();

    res.status(201).json({ message: "Add new user success." });
  } catch (err) {
    res.status(500).send({ message: err });
  }
}

async function handleLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send({ message: "Invalid body request." });

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).send({ message: "Incorrect email or password." });

    bycrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
      if (!result) {
        return res
          .status(404)
          .send({ message: "Incorrect email or password." });
      }

      const newSession = new Session({
        user: user._id,
      });

      const session = await newSession.save();

      res
        .cookie("session", session._id)
        .status(200)
        .send({ message: "Login success." });

      // const payload = {
      //   id: user._id,
      //   email: user.email,
      //   user_name: user.user_name,
      // };

      // const token = jwt.sign(payload, process.env.JWT_SECRET);

      // res
      //   .cookie("token", token)
      //   .status(200)
      //   .send({ message: "Login success." });
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
}

module.exports = { handleRegister, handleLogin };
