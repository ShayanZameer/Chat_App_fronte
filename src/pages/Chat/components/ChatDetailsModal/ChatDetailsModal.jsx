import React, { useState } from "react";

const ChatDetailsModal = ({ chatType, onClose }) => {
  const [email, setEmail] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (chatType === "one-on-one") {
      // Handle one-on-one chat creation logic
      console.log("Starting one-on-one chat with:", email);
    } else if (chatType === "group") {
      // Handle group chat creation logic
      const membersArray = groupMembers
        .split(",")
        .map((member) => member.trim());
      console.log(
        "Creating group chat with name:",
        groupName,
        "and members:",
        membersArray
      );
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
        <h2 className="text-xl font-bold mb-4">
          {chatType === "one-on-one"
            ? "Start a One-on-One Chat"
            : "Create a Group Chat"}
        </h2>
        <form onSubmit={handleSubmit}>
          {chatType === "one-on-one" ? (
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label
                  htmlFor="groupName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Group Name
                </label>
                <input
                  type="text"
                  id="groupName"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="groupMembers"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Group Members (comma-separated)
                </label>
                <input
                  type="text"
                  id="groupMembers"
                  value={groupMembers}
                  onChange={(e) => setGroupMembers(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            {chatType === "one-on-one" ? "Start Chat" : "Create Group"}
          </button>
        </form>
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

export default ChatDetailsModal;
