const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const URL = process.env.DB_URL;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  promiseLibrary: global.Promise,
};

const mongoDbConnect = async () => {
  try {
    mongoose.connect(URL, options);
    const db = mongoose.connection;
    db.once("open", () => console.log("Connected to mongoDB"));
    db.on("error", console.error.bind(console, "connection error:"));
  } catch (error) {}
};

module.exports = mongoDbConnect;
