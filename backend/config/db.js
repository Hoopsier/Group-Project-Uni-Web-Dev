
const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb://localhost:27017/web-project");
  console.log(`Connected to database`);
};

module.exports = connectDB;
