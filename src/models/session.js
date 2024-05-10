const moongose = require("mongoose");

const sessionSchema = new moongose.Schema({
  user_id: {
    type: moongose.Schema.Types.ObjectId,
    ref: "forum_user",
    require: true,
  },
  token: {
    type: String,
    require: true,
  },
});

const Session = moongose.model("forum_session", sessionSchema);

module.exports = Session;
