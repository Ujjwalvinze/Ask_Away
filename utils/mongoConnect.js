const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async (tryCount = 0) => {
  if (tryCount > 1) {
    console.log("DB Could Not connect...");
    return;
  }
  const mongoUrl = process.env.MONGO_URL || "";
  try {
    await mongoose.connect(mongoUrl);
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
    if (tryCount <= 1) {
      console.log("Trying to connect DB Again");
      connectDb(tryCount + 1);
    }
  }
};

module.exports = connectDb;
