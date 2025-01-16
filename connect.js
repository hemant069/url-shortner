const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/url-shortner");
  } catch (error) {
    console.error("something wrong with DB");
  }
};

module.exports = connectDB;
