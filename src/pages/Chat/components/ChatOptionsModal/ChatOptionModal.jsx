import React from "react";

const ChatOptionModal = ({ onSelectOption, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
        <h2 className="text-xl font-bold mb-4">Select Chat Type</h2>
        <button
          onClick={() => onSelectOption("one-on-one")}
          className="w-full p-2 mb-2 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          One-on-One Chat
        </button>
        <button
          onClick={() => onSelectOption("group")}
          className="w-full p-2 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          Group Chat
        </button>
        <button
          onClick={onClose}
          className="mt-4 w-full p-2 bg-red-500 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ChatOptionModal;
