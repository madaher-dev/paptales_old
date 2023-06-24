import mongoose from "mongoose";

let isConnected;

export const connectToDatabase = async () => {
  if (isConnected) {
    // console.log('Using existing database connection');
    return;
  }
  try {
    const mongooseOptions = {
      autoIndex: false,
    };
    isConnected = await mongoose.connect(
      process.env.NODE_ENV_CUSTOM === "production"
        ? process.env.DATABASE_PROD
        : process.env.DATABASE_STAGING,
      mongooseOptions
    );
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.log("Database connection error:", error);
  }
};

export default isConnected;
