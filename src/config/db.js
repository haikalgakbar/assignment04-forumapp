const MONGO_URI =
  process.env.ENV === "production"
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV;

module.exports = MONGO_URI;
