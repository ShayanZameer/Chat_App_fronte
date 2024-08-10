import React from "react";
import { FaEllipsisV } from "react-icons/fa"; // 3-dot icon

const ChatHeader = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h2 className="text-2xl font-semibold">Chats</h2>
      <FaEllipsisV className="text-xl cursor-pointer" />
    </div>
  );
};

export default ChatHeader;
