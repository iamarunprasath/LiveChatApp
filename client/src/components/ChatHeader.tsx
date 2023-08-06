import React from "react";
import { useNavigate } from "react-router-dom";
import exitImg from "../images/exit.png";
import rightArrowImg from "../images/right-arrow.png";

const ChatHeader = () => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="chatHeader flex flex-row justify-between items-center bg-red-400 px-5 py-4">
      <div className="flex flex-row justify-between items-center gap-5">
        <img
          src={rightArrowImg}
          className="expandBtn w-5 h-5 p-1 rounded-full bg-white hover:bg-gray-300 hover:cursor-pointer"
          alt="exit"
          onClick={handleLeaveChat}
        />
        <p className="text-white text-xl font-semibold capitalize">
          {localStorage.getItem("userName")}
        </p>
      </div>
      <p className="text-white text-xl font-bold">Live Chat</p>
      <img
        src={exitImg}
        className="leaveChatBtn w-8 h-8 p-1 rounded bg-white hover:bg-gray-300 hover:cursor-pointer"
        alt="exit"
        onClick={handleLeaveChat}
      />
    </header>
  );
};


export {ChatHeader};