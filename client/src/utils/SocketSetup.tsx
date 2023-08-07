import { io, Socket } from "socket.io-client";

const URL: string =
  process.env.NODE_ENV === "production"
    ? "provide_production_url"
    : "http://localhost:5000";

// Specify the type for the socket instance
export const socket: Socket = io(URL, {
  autoConnect: false,
});
