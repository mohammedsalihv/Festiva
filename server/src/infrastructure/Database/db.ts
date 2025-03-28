import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()


const URL = process.env.MONGO_URI || ""


const connectDB = async () : Promise<void> =>{
    try {
        await mongoose.connect(URL)
        console.log("✅ MongoDB connected successfully.");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
}

export default connectDB