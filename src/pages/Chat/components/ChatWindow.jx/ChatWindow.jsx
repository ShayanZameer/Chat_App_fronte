import React from "react";
import { FaPaperPlane } from "react-icons/fa";

import ChatDetails from "../ChatDetails/ChatDetails";
import ChatMessages from "../ChatMessages/ChatMessage";
const ChatWindow = ({ selectedChat }) => {
  console.log("Selected chat in ChatWindow:", selectedChat);

  if (!selectedChat) {
    return (
      <div className="flex-1 h-screen flex items-center justify-center">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex-1 h-screen flex flex-col">
      <ChatDetails chat={selectedChat} />
      <ChatMessages messages={selectedChat.messages} />

      <div className="pb-4  px-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-400 rounded-md"
        />
        <button className="p-2  bg-gray-400 rounded-md flex items-center justify-center">
          <FaPaperPlane className="w-6 h-6 text-green-600" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
