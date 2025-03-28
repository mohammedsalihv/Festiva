import app from "./app";
import connectDB from "./infrastructure/Database/db";
import dotenv from 'dotenv';
dotenv.config()


const PORT = process.env.PORT || 5000;
console.log("MONGO_URI:", process.env.MONGO_URI);

connectDB()
app.listen(PORT , ()=>{
    console.log(`🚀 Server running on http://localhost:${PORT}`);
})