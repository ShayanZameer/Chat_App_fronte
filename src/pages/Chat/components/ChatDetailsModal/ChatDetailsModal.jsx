import React, { useState } from "react";
import axios from "Axios";

const ChatDetailsModal = ({ chatType, onClose }) => {
  const [email, setEmail] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const currentUserId = localStorage.getItem("userId"); // Assuming you have the current user ID in localStorage

    if (chatType === "one-on-one") {
      if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }

      try {
        // Step 1: Fetch the user ID by email
        const userResponse = await axios.get(
          `${import.meta.env.VITE_HOST_URL}/api/users/getidbyemail`,
          {
            params: { email },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        const recipientUserId = userResponse.data.userId; // Assuming the response contains the user ID

        const response = await axios.post(
          `${import.meta.env.VITE_HOST_URL}/api/chat/createchat`,
          {
            chatName: email,
            users: [recipientUserId],
            isGroupChat: false,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        console.log("Chat created successfully:", response.data);
        onClose();
      } catch (error) {
        console.error("Error creating chat:", error.response?.data || error);
        setError("Failed to create chat. Please try again.");
      }
    } else if (chatType === "group") {
      const membersArray = groupMembers
        .split(",")
        .map((member) => member.trim());

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_HOST_URL}/api/chat/createchat`,
          {
            chatName: groupName,
            users: [currentUserId, ...membersArray], // Include current user and group members
            isGroupChat: true,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        console.log("Group chat created successfully:", response.data);
        onClose();
      } catch (error) {
        console.error(
          "Error creating group chat:",
          error.response?.data || error
        );
        setError("Failed to create group chat. Please try again.");
      }
    }
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
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
