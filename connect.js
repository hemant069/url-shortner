const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async () => {
  const URL = process.env.MONGO_URL;
  try {
    mongoose.connect(URL);
  } catch (error) {
    console.error("something wrong with DB");
  }
};

module.exports = connectDB;
