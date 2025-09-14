import http from "http";
import app from "./app";
import connectDatabase from "./config/database/mongodb";
import dotenv from "dotenv";
import logger from "./utils/baseUtilities/messages/logger";
import { initSocket } from "./config/socket";

dotenv.config();

const PORT = process.env.PORT || 4000;
connectDatabase();

const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
