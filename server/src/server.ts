import app from "./app";
import connectDB from "./infrastructure/database/db";
import dotenv from 'dotenv';
import logger from "./utils/common/messages/logger";
logger
dotenv.config()

const PORT = process.env.PORT || 4000;

connectDB()
app.listen(PORT , ()=>{
    logger.info(`Server running on http://localhost:${PORT}`)
})