import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";
import profile from "../../../public/user.jpg";
function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  // console.log(selectedConversation.fullname);
  return (
    <div className="relative flex h-16 shrink-0 items-center justify-center gap-4 rounded-md bg-slate-800 duration-300 hover:bg-slate-700 sm:h-[72px]">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>
      <div className="flex h-full items-center justify-center space-x-3 bg-gray-800 duration-300 hover:bg-gray-700">
        <div className="avatar online">
          <div className="w-16 rounded-full">
            <img src={profile} />
          </div>
        </div>
        <div>
          <h1 className="text-xl">{selectedConversation.fullname}</h1>
          <span className="text-sm">
            {getOnlineUsersStatus(selectedConversation._id)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;
