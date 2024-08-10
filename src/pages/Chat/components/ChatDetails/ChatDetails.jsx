import React from "react";

const ChatDetails = ({ chat }) => {
  return (
    <div className="p-4 border-b flex items-center">
      <img
        src={chat.profilePicture}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="ml-4">
        <h3 className="text-lg font-semibold">{chat.chatName}</h3>
        <p className="text-sm text-gray-500">{chat.info}</p>
      </div>
    </div>
  );
};

export default ChatDetails;
