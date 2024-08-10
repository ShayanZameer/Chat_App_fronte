import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

import ChatDetails from "../ChatDetails/ChatDetails";
import ChatMessages from "../ChatMessages/ChatMessage";
const ChatWindow = ({ selectedChat, setSelectedChat }) => {
  const [message, setMessage] = useState("");
  if (!selectedChat) {
    return (
      <div className="flex-1 h-screen flex items-center justify-center">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // Create a new message object
      const newMessage = {
        sender: "userId", // Replace with the actual user ID
        content: message,
        chat: selectedChat._id,
        createdAt: new Date(),
      };

      // Update the chat state with the new message
      setSelectedChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat.messages, newMessage],
      }));

      // Clear the input field
      setMessage("");
    }
  };

  return (
    <div className="flex-1 h-screen flex flex-col">
      <ChatDetails chat={selectedChat} />
      <ChatMessages messages={selectedChat.messages} />

      <div className="pb-4  px-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          className="flex-1 p-2 border border-gray-400 rounded-md"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <button
          onClick={handleSendMessage}
          className="p-2  bg-gray-400 rounded-md flex items-center justify-center"
        >
          <FaPaperPlane className="w-6 h-6 text-green-600" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
