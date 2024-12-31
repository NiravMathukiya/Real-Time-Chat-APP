import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export const getRecevierSocketId =(userId)=>{
  return userSockeetMap[userId];
}

// used to store new and online user
const userSockeetMap = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSockeetMap[userId] = socket.id;
  }

  //   io.emit() is used to send msg to all connected user
  io.emit("getOnlineUsers", Object.keys(userSockeetMap));
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete userSockeetMap[userId];
    io.emit("getOnlineUsers",Object.keys(userSockeetMap))
  });
});

export { io, app, server };
