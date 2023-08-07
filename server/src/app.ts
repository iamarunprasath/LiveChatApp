import express, { Express } from "express";
import http from "http";
import { Server } from "socket.io";
import { router } from "./Routes/routes";
import cors from "cors";
import socketUtil from "./Utils/Socket.utils";
import * as dotenv from "dotenv";
import { config } from "./Common/Config";
dotenv.config();

const app: Express = express();
const server = http.createServer(app);
const PORT: number = Number(config.port);

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api", router);

const io = new Server(server, {
  cors: {
    origin: config.clientUrl,
  },
});
socketUtil();

server.listen(PORT, () => {
  console.log(`⚡ Server is Running on the Port ${PORT} ⚡`);
});

export { io };
