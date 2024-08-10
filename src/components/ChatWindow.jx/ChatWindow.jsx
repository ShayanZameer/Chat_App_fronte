import React from "react";
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
    </div>
  );
};

export default ChatWindow;
