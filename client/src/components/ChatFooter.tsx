import React, { useState } from "react";
import { SocketComponentProps } from "../Interfaces/socket.interfaces";

const ChatFooter: React.FC<SocketComponentProps> = ({ socket }) => {
  const [message, setMessage] = useState<string>("");
  const handleTyping = () =>
    socket.emit("typing", `${localStorage.getItem("userName")} is typing`);

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };
  return (
    <div className="chatFooter pb-2 py-1">
      <form className="chatForm flex flex-row gap-5 justify-between px-5" onSubmit={handleSendMessage}>
        <textarea
          id="message"
          rows={1}
          className="message p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 transition-all duration-300 resize-none"
          placeholder="Write Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        ></textarea>
        <button className="sendBtn bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Send</button>
      </form>
    </div>
  );
};

export { ChatFooter };
