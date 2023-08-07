import { useState, useEffect } from "react";
import { SocketComponentProps } from "../Interfaces/socket.interfaces";
import { User } from "../Interfaces/User.interfaces";

const ChatUsers = ({ socket }: SocketComponentProps) => {
  const [users, setUsers] = useState<User[]>([]);

  // 👇️ get the active users
  useEffect(() => {
    socket.on("userLists", (data: any) => setUsers(data));
  }, [socket, users]);

  return (
    <div className="chatSidebar bg-red-200 h-screen text-center w-1/3 md:px-10 md:w-1/4">
      <div className="flex flex-col">
        <h4 className="chatHeader py-5">ACTIVE USERS</h4>
        <div className="chatUsers flex flex-col gap-1 w-min pl-1">
          {users?.map((user: User) => (
            <span className="inline-flex items-center bg-white text-black text-sm font-medium mr-2 px-3 py-0.5 rounded-full capitalize">
              <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
              <p key={user.socketID}>{user.username}</p>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ChatUsers };
