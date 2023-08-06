import React, { useEffect, useState, useRef } from "react";
import { ChatBar } from "./ChatBar";
import { ChatBody } from "./ChatBody";
import { ChatFooter } from "./ChatFooter";
import { ChatHeader } from "./ChatHeader";
import { SocketComponentProps } from "../Interfaces/socket.interfaces";

const ChatPage: React.FC<SocketComponentProps> = ({ socket }) => {
  const [messages, setMessages] = useState<string[]>([]);

  const [typingStatus, setTypingStatus] = useState<string>("");
  const lastMessageRef = useRef<any>(null);

  useEffect(() => {
    socket.on("messageResponse", (data: any) =>
      setMessages([...messages, data])
    );
  }, [socket, messages]);

  useEffect(() => {
    socket.on("typingResponse", (data: any) => setTypingStatus(data));
  }, [socket]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat object-contain	">
      {/* <ChatBar socket={socket} /> */}
      <div className="chatMain flex flex-col w-screen h-screen object-contain">
        <ChatHeader />
        <div className="flex-1 bg-blue-50">
          <ChatBody
            messages={messages}
            typingStatus={typingStatus}
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
