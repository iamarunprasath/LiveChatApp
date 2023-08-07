import { useNavigate } from "react-router-dom";
import exitImg from "../images/exit.png";
import rightArrowImg from "../images/right-arrow.png";
import { reset, revert, selectExpand } from "../Redux/ExpandReducer";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { SocketComponentProps } from "../Interfaces/socket.interfaces";

const ChatHeader = ({ socket }: SocketComponentProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isExpanded = useAppSelector(selectExpand);

  const handleLeaveChat = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("socketID");
    localStorage.removeItem("userId");
    socket.emit("leaveChat");
    dispatch(reset());
    navigate("/");
    // window.location.reload();
  };

  // 👇️ send the event to get active users when expanded and revert the isExpanded status
  const hanldeExpanded = () => {
    if (!isExpanded) {
      socket.emit("getUserList", {
        username: localStorage.getItem("username"),
        socketID: socket.id,
        userId: localStorage.getItem("userId"),
      });
    }
    dispatch(revert());
  };

  return (
    <header className="chatHeader flex flex-row justify-between items-center bg-red-400 px-5 py-4">
      <div className="flex flex-row justify-between items-center gap-5">
        <img
          src={rightArrowImg}
          className="expandBtn w-5 h-5 p-1 rounded-full bg-white hover:bg-gray-300 hover:cursor-pointer"
          alt="exit"
          onClick={hanldeExpanded}
        />
        <p className="text-white text-xl font-semibold capitalize">
          {localStorage.getItem("username")}
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

export { ChatHeader };
