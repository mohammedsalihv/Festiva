import { Server } from "socket.io";
let io: Server;

const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinHostRoom", (hostId) => {
      socket.join(`host-${hostId}`);
    });
  });
};

export const sendNotificationToHost = (hostId: string, message: string) => {
  if (!io) return;
  io.to(`host-${hostId}`).emit("notification", {
    message,
    time: new Date().toISOString(),
  });
};

export default initSocket;
