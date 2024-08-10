import React from "react";

const ChatItem = ({ profilePicture, chatName, latestMessage, onClick }) => {
  return (
    <div
      className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      <img
        src={profilePicture}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="ml-4">
        <h3 className="text-md font-semibold">{chatName}</h3>
        <p className="text-sm text-gray-600">{latestMessage}</p>
      </div>
    </div>
  );
};

export default ChatItem;
