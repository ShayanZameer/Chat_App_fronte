// import React from "react";
// import { FaEllipsisV } from "react-icons/fa"; // 3-dot icon

// const ChatHeader = () => {
//   return (
//     <div className="flex justify-between items-center p-4 border-b">
//       <h2 className="text-2xl font-semibold">Chats</h2>
//       <FaEllipsisV className="text-xl cursor-pointer" />
//     </div>
//   );
// };

// export default ChatHeader;

import React, { useState } from "react";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import ChatOptionModal from "../ChatOptionsModal/ChatOptionModal";
import ChatDetailsModal from "../ChatDetailsModal/ChatDetailsModal";
const ChatHeader = () => {
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [chatType, setChatType] = useState("");

  const handleInitiateChatClick = () => {
    setShowOptionsModal(true);
  };

  const handleOptionSelect = (type) => {
    setChatType(type);
    setShowOptionsModal(false);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setChatType("");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="text-xl font-bold">Chat Header</div>
      <div className="flex items-center">
        <button
          onClick={handleInitiateChatClick}
          className="p-2 text-blue-500 hover:bg-blue-100 rounded-full"
        >
          <FaPlus className="w-6 h-6" />
        </button>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <FaEllipsisV className="w-6 h-6" />
        </button>
      </div>
      {showOptionsModal && (
        <ChatOptionModal
          onSelectOption={handleOptionSelect}
          onClose={() => setShowOptionsModal(false)}
        />
      )}
      {showDetailsModal && (
        <ChatDetailsModal
          chatType={chatType}
          onClose={handleCloseDetailsModal}
        />
      )}
    </div>
  );
};

export default ChatHeader;
