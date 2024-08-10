import React from "react";
import ChatItem from "../ChatItem/ChatItem";

// Dummy data for chats
const chats = [
  {
    id: 1,
    profilePicture: "https://via.placeholder.com/150",
    chatName: "John Doe",
    latestMessage: "Hey! How are you?",
    info: "This is John's chat info",
    messages: [
      { sender: "John Doe", content: "Hey! How are you?" },
      { sender: "You", content: "I'm good, thanks!" },
    ],
  },
  {
    id: 2,
    profilePicture: "https://via.placeholder.com/150",
    chatName: "Jane Smith",
    latestMessage: "Meeting at 5 PM",
    info: "This is Jane's chat info",
    messages: [
      { sender: "Jane Smith", content: "Meeting at 5 PM" },
      { sender: "You", content: "Sure, see you there!" },
      // Add more messages
    ],
  },
];

const ChatsList = ({ setSelectedChat }) => {
  return (
    <div className="overflow-y-auto">
      {chats.map((chat) => (
        <ChatItem
          key={chat.id}
          profilePicture={chat.profilePicture}
          chatName={chat.chatName}
          latestMessage={chat.latestMessage}
          onClick={() => {
            console.log("Chat clicked:", chat);
            setSelectedChat(chat);
          }}
        />
      ))}
    </div>
  );
};

export default ChatsList;
