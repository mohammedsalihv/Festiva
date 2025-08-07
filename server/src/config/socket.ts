import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";

let io: IOServer;

export const initSocket = (httpServer: HTTPServer) => {
  io = new IOServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join-host-room", (hostId: string) => {
      socket.join(`host-${hostId}`);
    });

    socket.on("disconnect", () => {});
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
