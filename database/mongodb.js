import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

const connectToDatabase = async () => {
  try {
    if (!DB_URI) {
      throw new Error(
        "Database URI is not defined in .env.<development/production>.local"
      );
    }

    await mongoose.connect(DB_URI);
    console.log(`Connected to MongoDB in ${NODE_ENV} mode`);
  } catch (error) {
    console.log("Error connecting to the database:", error);
    process.exit(1);
  }
};

export default connectToDatabase;
