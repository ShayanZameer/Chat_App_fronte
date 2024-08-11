import React, { useEffect, useState } from "react";
import axios from "Axios"; // Make sure 'axios' is properly imported with a lowercase 'a'.
import ChatItem from "../ChatItem/ChatItem";

const ChatsList = ({ setSelectedChat }) => {
  const [chats, setChats] = useState([]);

  const currentUserId = localStorage.getItem("userId");

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

  return (
    <div className="overflow-y-auto">
      {chats.map((chat) => {
        let displayName;
        let profilePicture;

        if (chat.isGroupChat) {
          displayName = chat.chatName; // Display the group chat name
          profilePicture = "https://robohash.org/mail@ashallendesign.co.uk";
        } else {
          const receiver = chat.users.find(
            (user) => user._id !== currentUserId
          );
          displayName = receiver?.name || "Unknown";
          profilePicture = receiver?.pic;
        }

        return (
          <ChatItem
            key={chat._id}
            profilePicture={profilePicture}
            chatName={displayName}
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
