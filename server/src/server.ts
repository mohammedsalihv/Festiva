import http from "http";
import app from "./app";
import connectDB from "./infrastructure/database/db";
import dotenv from "dotenv";
import logger from "./utils/common/messages/logger";
import { initSocket } from "./config/socket";

dotenv.config();

const PORT = process.env.PORT || 4000;

connectDB();

const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
