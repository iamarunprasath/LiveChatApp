import React from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import exitImg from "../images/exit.png";
import rightArrowImg from "../images/right-arrow.png";

interface chatBodyPropInterface {
  messages: any;
  typingStatus: string;
  lastMessageRef: any;
  socket: Socket;
}
const ChatBody = ({
  messages,
  typingStatus,
  lastMessageRef,
  socket,
}: chatBodyPropInterface) => {

  return (
    <div className="chatBodyContainer">
      <div className="messageContainer bg-blue-50 ">
        <div className="px-10">
          {messages.map((message: any) =>
            message.name === localStorage.getItem("userName") ? (
              <div
                className="messageChats flex flex-col items-end py-1"
                key={message.id}
              >
                <p className="senderName text-right">You</p>
                <div className="messageSender bg-red-400 text-white w-min px-3 py-1 rounded-lg">
                  <p>{message.text}</p>
                </div>
              </div>
            ) : (
              <div
                className="messageChats bg-blue-50 flex flex-col items-start py-1"
                key={message.id}
              >
                <p className="text-left">{message.name}</p>
                <div className="messageR__recipient bg-blue-500 text-white w-min px-3 py-1 rounded-lg">
                  <p>{message.text}</p>
                </div>
              </div>
            )
          )}

          <div className="messageStatus p-2">
            <p>{typingStatus}</p>
          </div>
          <div ref={lastMessageRef} />
        </div>
      </div>
    </div>
  );
};

export { ChatBody };
