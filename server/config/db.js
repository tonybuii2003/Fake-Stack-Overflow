const mongoose = require("mongoose");
const MONGO_URI = "mongodb://127.0.0.1:27017/fake_so"
async function connectDB() {
  try {
    const connect = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;
