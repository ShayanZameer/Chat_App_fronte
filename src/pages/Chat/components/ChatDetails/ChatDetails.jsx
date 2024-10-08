// import React from "react";

// const ChatDetails = ({ chat }) => {
//   const currentUserId = localStorage.getItem("userId");
//   const receiver = chat.users.find((user) => user._id !== currentUserId);
//   console.log(receiver, "hhh");
//   return (
//     <div className="p-4 border-b flex items-center">
//       <img
//         src={receiver.pic}
//         alt="Profile"
//         className="w-10 h-10 rounded-full object-cover"
//       />
//       <div className="ml-4">
//         <h3 className="text-lg font-semibold">{receiver.name}</h3>
//         <p className="text-sm text-gray-500">
//           This is <span>{receiver.name}</span> info{" "}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ChatDetails;

import React from "react";

const ChatDetails = ({ chat }) => {
  const currentUserId = localStorage.getItem("userId");

  let displayName;
  let profilePicture;

  if (chat.isGroupChat) {
    displayName = chat.chatName;
    profilePicture = "https://robohash.org/mail@ashallendesign.co.uk";
  } else {
    const receiver = chat.users.find((user) => user._id !== currentUserId);
    displayName = receiver?.name || "Unknown";
    profilePicture = receiver?.pic;
  }

  return (
    <div className="p-4 border-b flex items-center">
      <img
        src={profilePicture}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="ml-4">
        <h3 className="text-lg font-semibold">{displayName}</h3>
        {chat.isGroupChat ? (
          <p className="text-sm text-gray-500">
            This is a group chat: <span>{displayName}</span>
          </p>
        ) : (
          <p className="text-sm text-gray-500">
            This is <span>{displayName}</span>'s info
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatDetails;
