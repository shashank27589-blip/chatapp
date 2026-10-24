import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3001", process.env.RENDER_EXTERNAL_URL].filter(Boolean),
    methods: ["GET", "POST"],
  },
});

// Keep all active tabs/devices for each account connected to one room.
const userSockets = new Map();

export const getReceiverSocketId = (receiverId) => userSockets.get(receiverId);

// used to listen events on server side.
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    socket.join(userId);
    const sockets = userSockets.get(userId) ?? new Set();
    sockets.add(socket.id);
    userSockets.set(userId, sockets);
  }
  io.emit("getOnlineUsers", [...userSockets.keys()]);

  // used to listen client side events emitted by server side (server & client)
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    const sockets = userSockets.get(userId);
    sockets?.delete(socket.id);
    if (sockets?.size === 0) userSockets.delete(userId);
    io.emit("getOnlineUsers", [...userSockets.keys()]);
  });
});

export { app, io, server };
