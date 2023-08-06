import React, { useState, useEffect } from "react";
import { SocketComponentProps } from "../Interfaces/socket.interfaces";

interface User {
  userName: string;
  socketID: string;
}

const ChatBar: React.FC<SocketComponentProps> = ({ socket }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.on("newUserResponse", (data: any) => setUsers(data));
  }, [socket, users]);

  return (
    <div className="chatSidebar bg-red-200 h-screen p-10 w-1/4">
      <div className="flex flex-col gap-5">
        <h4 className="chatHeader">ACTIVE USERS</h4>
        <div className="chatUsers flex flex-col gap-1 w-min">
          {users?.map((user: User) => (
            <span className="inline-flex items-center bg-white text-black text-sm font-medium mr-2 px-3 py-0.5 rounded-full capitalize">
              <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
              <p key={user.socketID}>{user.userName}</p>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ChatBar };
