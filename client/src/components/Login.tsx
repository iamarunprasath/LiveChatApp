import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketComponentProps } from "../Interfaces/socket.interfaces";
import loginImg from "../images/loginImg.jpg";

const Login = ({ socket }: SocketComponentProps) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    socket.emit("newUser", { userName, socketID: socket.id });
    navigate("/chat");
  };

  return (
    <div className="w-full flex flex-row items-center justify-between h-screen w-screen text-center overflow-hidden">
      <div className="flex-1 p-10">
        <label className="text-red-400 text-2xl font-bold">Live ChatApp</label>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex-col items-center justify-center space-y-2">
            <label
              className="block text-gray-700 text-base py-2 font-bold mb-2"
              htmlFor="title"
            >
              Enter your Username to Enter the Chat
            </label>
            <input
              type="text"
              minLength={2}
              name="username"
              id="username"
              placeholder="Username"
              className="shadow appearance-none border rounded w-full md:w-1/2  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <button className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Enter Chat
          </button>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;Developed by Arunprasath.
        </p>
      </div>
      <div className="hidden sm:block flex-1 p-10 md:p-1 ">
        <img className="object-contain h-auto w-auto" src={loginImg} alt="Login Img"></img>
      </div>
    </div>
  );
};

export { Login };
