import app from "./app";
import connectDB from "./infrastructure/Database/db";
import dotenv from 'dotenv';
import logger from "./utils/logger";
logger
dotenv.config()

const PORT = process.env.PORT || 4000;

connectDB()
app.listen(PORT , ()=>{
    logger.info(`Server running on http://localhost:${PORT}`)
})