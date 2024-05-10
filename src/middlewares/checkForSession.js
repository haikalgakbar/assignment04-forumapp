const Session = require("../models/session");

async function checkForSession(req, res, next) {
  if (
    !req.cookies?.session ||
    !(await Session.findOne({ _id: req.cookies?.session }))
  )
    return res.status(403).json({ message: "Unauthorized." });

  next();
}

module.exports = checkForSession;
