import React, { useEffect, useState } from "react";
import axios from "Axios";
import { FaPaperPlane } from "react-icons/fa";

import ChatDetails from "../ChatDetails/ChatDetails";
import ChatMessages from "../ChatMessages/ChatMessage";

const ChatWindow = ({ selectedChat, setSelectedChat }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_HOST_URL}/api/message/getmessages/${
              selectedChat._id
            }`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          );

          setMessages(response.data); // Set full messages
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();
    }
  }, [selectedChat]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        sender: localStorage.getItem("userId"),
        content: message,
        chatId: selectedChat._id,
        createdAt: new Date(),
      };

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_HOST_URL}/api/message/sendmessage`,
          newMessage,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        setMessages((prevMessages) => [...prevMessages, response.data]);

        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

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
      <ChatMessages messages={messages} />

      <div className="pb-4 px-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          className="flex-1 p-2 border border-gray-400 rounded-md"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-gray-400 rounded-md flex items-center justify-center"
        >
          <FaPaperPlane className="w-6 h-6 text-green-600" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
