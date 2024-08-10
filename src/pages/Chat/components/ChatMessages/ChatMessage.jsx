import React from "react";

const ChatMessages = ({ messages }) => {
  const currentUserId = localStorage.getItem("userId");

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((message) => {
        // Extract user ID from the sender object
        const messageSenderId = message.sender._id;

        const isCurrentUser = messageSenderId === currentUserId;

        return (
          <div
            key={message._id}
            className={`flex mb-2 ${
              isCurrentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-2 rounded-lg ${
                isCurrentUser
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <p>{message.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
