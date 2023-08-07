import { config } from "../Common/Config";
import { io } from "../app";
import { addToRedisCircularBuffer } from "./RedisCircularBuffer";

interface userType {
  userName: string;
  socketID: string;
  userId: string;
}
let users: userType[] = [];

const socketUtil = () => {
  io.on("connection", (socket) => {
    socket.on("message", (data) => {
      addToRedisCircularBuffer("messageBuffer", JSON.stringify(data), Number(config.messageRateLimit));
      io.emit("messageResponse", data);
    });

    socket.on("newUser", (data) => {
      (socket as any).userId = data?.userId;
      users.push(data);
      io.emit("userLists", users);
    });

    socket.on("getUserList", (data) => {
      const isUserInList: boolean = users.some(
        (user) => user.userId === data.userId
      );
      if (!isUserInList) {
        (socket as any).userId = data?.userId;
        users.push(data);
      }
      io.emit("userLists", users);
    });

    socket.on("leaveChat", () => {
      // users = users.filter((user) => user.socketID !== socket.id);
      users = users.filter((user) => user.userId !== (socket as any).userId);
      io.emit("userLists", users);
      socket.disconnect();
    });

    socket.on("disconnect", () => {
      // users = users.filter((user) => user.userId !== socket.id);
      users = users.filter((user) => user.userId !== (socket as any).userId);
      io.emit("userLists", users);
      socket.disconnect();
    });
  });
};

export default socketUtil;
