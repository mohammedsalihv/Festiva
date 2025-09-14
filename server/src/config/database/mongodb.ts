import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../../utils/baseUtilities/messages/logger";
logger;

dotenv.config();
const URL = process.env.MONGO_URI || "";
const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(URL);
    logger.info("MongoDB connected successfully.");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDatabase;
