async function checkForEmptyBody(req, res, next) {
  if (req.method !== "GET") {
    if (Object.keys(req.body).length === 0)
      return res.status(400).send({ message: "Invalid request." });
  }

  next();
}

module.exports = checkForEmptyBody;
