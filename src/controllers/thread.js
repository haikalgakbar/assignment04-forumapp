const Thread = require("../models/thread");

async function handleGetThreads(req, res) {
  // const { id } = req.params;
  // const session = req.cookies.session ?? "";

  try {
    const threads = await Thread.find();
    // .populate("sender")
    // .populate({ path: "comments", populate: { path: "user" } });

    res.status(200).send(threads);
  } catch (err) {
    res.status(500).send({ message: err });
  }
}

module.exports = { handleGetThreads };
