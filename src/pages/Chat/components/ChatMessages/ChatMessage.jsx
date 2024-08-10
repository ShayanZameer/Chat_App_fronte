import React from "react";

const ChatMessages = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <div key={index} className="mb-4">
          <p className="font-semibold">{message.sender}</p>
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
