import React, { useEffect, useState } from "react";
import axios from "Axios";
import ChatItem from "../ChatItem/ChatItem";

const ChatsList = ({ setSelectedChat }) => {
  const [chats, setChats] = useState([]);
  const currentUserId = localStorage.getItem("userId"); // Assuming the current user's ID is stored in localStorage

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_HOST_URL}/api/chat/fetchchats`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchChats();
  }, []);

  // const getReceiverInfo = (users) => {
  //   return users.find((user) => user._id !== currentUserId) || {};
  // };

  return (
    <div className="overflow-y-auto">
      {chats.map((chat) => {
        const receiver = chat.users[1];
        console.log("Receiver Info:", receiver); // Debugging: Log receiver info

        return (
          <ChatItem
            key={chat._id}
            profilePicture={receiver.pic}
            chatName={receiver.name || "Unknown"}
            latestMessage={chat.latestMessage?.content || "No messages yet"}
            onClick={() => {
              setSelectedChat(chat);
            }}
          />
        );
      })}
    </div>
  );
};

export default ChatsList;
