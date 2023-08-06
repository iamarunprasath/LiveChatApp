import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from "./components/ChatPage";
import io, { Socket } from "socket.io-client";
import { Login } from "./components/Login";

const socket: Socket = io("http://localhost:5000");

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
