import { Socket } from "socket.io";
import { io } from "../app";

interface userType {
  userName: string;
  socketID: string;
}
let users: userType[] = [];

const socketUtil = () => {
  io.on("connection", (socket) => {
    console.log(socket?.data);
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on("message", (data) => {
      io.emit("messageResponse", data);
    });

    socket.on("typing", (data) =>
      socket.broadcast.emit("typingResponse", data)
    );

    socket.on("newUser", (data) => {
      users.push(data);
      io.emit("newUserResponse", users);
    });

    socket.on("disconnect", () => {
      console.log("🔥: A user disconnected");
      users = users.filter((user) => user.socketID !== socket.id);
      io.emit("newUserResponse", users);
      socket.disconnect();
    });
  });
};

export default socketUtil;
