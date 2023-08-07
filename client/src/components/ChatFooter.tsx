import { useState } from "react";
import { SocketComponentProps } from "../Interfaces/socket.interfaces";

const ChatFooter = ({ socket }: SocketComponentProps) => {
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("username")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("username"),
        socketID: socket.id,
        userId: localStorage.getItem("userId"),
      });
    }
    setMessage("");
  };
  return (
    <div className="chatFooter pb-2 py-1">
      <form
        className="chatForm flex flex-row gap-5 justify-between px-5"
        onSubmit={handleSendMessage}
      >
        <textarea
          id="message"
          rows={1}
          className="message p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 transition-all duration-300 resize-none"
          placeholder="Write Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button className="sendBtn bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Send
        </button>
      </form>
    </div>
  );
};

export { ChatFooter };
