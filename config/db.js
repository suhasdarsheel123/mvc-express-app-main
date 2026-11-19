import mongoose from "mongoose";

let isConnected = false;
const connectDB = async (mongoUri) => {
  if (isConnected || mongoose.connection.readyState >= 1) return;
  const uri =
    mongoUri ||
    process.env.MONGO_URI ||
    "mongodb+srv://admin:Cherry1234@cluster0.s735bf2.mongodb.net/?retryWrites=true&w=majority";
  const dbName = process.env.DB_NAME || "mvc_movies_db";
  try {
    await mongoose.connect(uri, { dbName });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Problem while connecting mongoDB:", err.message);
  }
};

export default connectDB;
