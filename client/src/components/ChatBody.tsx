import { Socket } from "socket.io-client";

interface chatBodyPropInterface {
  messages: any;
  lastMessageRef: any;
  socket: Socket;
}

const ChatBody = ({
  messages,
  lastMessageRef,
  socket,
}: chatBodyPropInterface) => {
  return (
    <div className="chatBodyContainer overflow-y-auto">
      <div className="messageContainer bg-blue-50 ">
        <div className="px-10">
          {messages.map((message: any) =>
            message.userId === localStorage.getItem("userId") ? (
              <div
                className="messageChats flex flex-col items-end py-1"
                key={message.id}
              >
                <p className="senderName text-right">You</p>
                <div className="messageSender bg-red-400 text-white w-fit px-3 py-1 rounded-lg">
                  <p>{message.text}</p>
                </div>
              </div>
            ) : (
              <div
                className="messageChats bg-blue-50 flex flex-col items-start py-1"
                key={message.id}
              >
                <p className="text-left">{message.name}</p>
                <div className="messageR__recipient bg-blue-500 text-white w-fit px-3 py-1 rounded-lg">
                  <p>{message.text}</p>
                </div>
              </div>
            )
          )}
          <div ref={lastMessageRef} />
        </div>
      </div>
    </div>
  );
};

export { ChatBody };
