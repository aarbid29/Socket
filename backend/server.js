import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

const port = 3001;

app.use(cors());

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
// // listening for incoming connections
io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  // // broadcast  message to all connected clients
  // // socket.broadcast.emit("receive message", data);
});

httpServer.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
