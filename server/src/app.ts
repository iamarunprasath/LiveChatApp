import express, { Express } from "express";
import http from "http";
import { Server } from "socket.io";
import { router } from "./Routes/routes";
import cors from "cors";
import socketUtil from "./Utils/Socket.utils";

const app: Express = express();
const server = http.createServer(app);
const PORT: number = 5000;

app.use(cors({ origin: "http://192.168.55.110:3000" }));
app.use("/api", router);

// const io = setupSocket(server);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

socketUtil();
// io.on("connection", (socket) => {
//   socket.on("connect", () => {
//     console.log("A user cconnected.");
//   });

//   console.log("A user connected.");

//   socket.on("/foo", (data) => {
//     console.log("Received message:", data);
//     // Broadcast the received message to all connected clients, including the sender
//     io.emit("message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected.");
//   });
// });

server.listen(PORT, () => {
  console.log("App is running!");
});

export { io };
