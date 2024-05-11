const mongoose = require("mongoose");

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function isString(str) {
  return typeof str === "string";
}

module.exports = { isValidObjectId, isString };
