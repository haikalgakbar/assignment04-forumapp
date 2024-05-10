const moongose = require("mongoose");

const sessionSchema = new moongose.Schema({
  user: {
    type: moongose.Schema.Types.ObjectId,
    ref: "forum_user",
    require: true,
  },
});

const Session = moongose.model("forum_session", sessionSchema);

module.exports = Session;
