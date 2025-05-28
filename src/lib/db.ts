import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI! as string);
    console.log(`Successfully connected to the database.`);
  } catch (error) {
    console.log(error);
  }
};

export default connectToDatabase;
