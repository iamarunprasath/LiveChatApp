import React, { useEffect, useState, useRef } from "react";
import { ChatUsers } from "./ChatUsers";
import { ChatBody } from "./ChatBody";
import { ChatFooter } from "./ChatFooter";
import { ChatHeader } from "./ChatHeader";
import { SocketComponentProps } from "../Interfaces/socket.interfaces";
import { selectExpand } from "../Redux/ExpandReducer";
import { useAppSelector } from "../Redux/hooks";
import axios from "axios";

const ChatPage = ({ socket }: SocketComponentProps) => {
  const [messages, setMessages] = useState<string[]>([]);
  const lastMessageRef = useRef<any>(null);
  const isExpanded = useAppSelector(selectExpand);

  // 👇️ Connect to socket in case of reload
  // Display all active users (used for adding the user in list when screen is reloaded)
  // and some message in the chatbox when login and reloading the screen
  useEffect(() => {
    if (!socket?.id) {
      socket.connect();
    }
    socket.emit("getUserList", {
      username: localStorage.getItem("username"),
      socketID: socket.id,
      userId: localStorage.getItem("userId"),
    });
    async function getRedisMessages() {
      const result = await axios.post(
        "http://localhost:5000/api/get-messages",
        { listKey: "messageBuffer" }
      );
      setMessages([...messages, ...result?.data?.messages]);
    }
    getRedisMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 👇️ Display all users message in the chatbox
  useEffect(() => {
    socket.on("messageResponse", (data: any) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  // 👇️ scroll to bottom every time messages change
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat object-contain	flex">
      {isExpanded ? <ChatUsers socket={socket} /> : ""}
      <div className="chatMain flex flex-col w-screen h-screen object-contain">
        <ChatHeader socket={socket} />
        <div className="flex-1 bg-blue-50 overflow-y-auto">
          <ChatBody
            messages={messages}
            lastMessageRef={lastMessageRef}
            socket={socket}
          />
        </div>
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
