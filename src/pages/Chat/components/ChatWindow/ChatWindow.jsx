import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "Axios";
import { FaPaperPlane } from "react-icons/fa";
import ChatDetails from "../ChatDetails/ChatDetails";
import ChatMessages from "../ChatMessages/ChatMessage";

const socket = io(import.meta.env.VITE_HOST_URL);

const ChatWindow = ({ selectedChat, setSelectedChat }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (selectedChat) {
      console.log("Joining chat:", selectedChat._id);
      socket.emit("joinChat", selectedChat._id);

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

          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();

      const handleMessageReceived = (newMessage) => {
        console.log("New message received:", newMessage);
        if (newMessage.chatId === selectedChat._id) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      };

      socket.on("messageReceived", handleMessageReceived);

      const handleDisconnect = async () => {
        console.log("Socket disconnected. Storing messages...");
        try {
          await axios.post(
            `${import.meta.env.VITE_HOST_URL}/api/message/sendmessage`,
            {
              chatId: selectedChat._id,
              messages: messagesRef.current,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            }
          );
        } catch (error) {
          console.error("Error storing messages:", error);
        }
      };

      socket.on("disconnect", handleDisconnect);

      return () => {
        console.log("Cleaning up socket listeners for chat:", selectedChat._id);
        socket.off("messageReceived", handleMessageReceived);
        socket.off("disconnect", handleDisconnect);
      };
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
        // Emit message to server
        socket.emit("sendMessage", newMessage);

        // Optionally, you can update the local state immediately if needed
        setMessages((prevMessages) => [...prevMessages, newMessage]);

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
