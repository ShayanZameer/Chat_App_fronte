// import { useState } from "react";
// import SideBar from "./components/chatSidebar/sideBar";

// import ChatWindow from "./components/ChatWindow.jx/ChatWindow";

// const Chat = () => {
//   const [selectedChat, setSelectedChat] = useState(null);

//   return (
//     <div className="flex">
//       <SideBar setSelectedChat={setSelectedChat} />
//       <ChatWindow
//         selectedChat={selectedChat}
//         setSelectedChat={setSelectedChat}
//       />
//     </div>
//   );
// };

// export default Chat;

import { useState } from "react";
import SideBar from "./components/chatSidebar/sideBar";
import ChatWindow from "./components/ChatWindow.jx/ChatWindow";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showChatWindow, setShowChatWindow] = useState(false);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setShowChatWindow(true);
  };

  const handleBackToSidebar = () => {
    setShowChatWindow(false);
  };

  return (
    <div className="flex flex-grow h-screen">
      {/* SideBar */}
      <div
        className={`${
          showChatWindow ? "hidden" : "block"
        } sm:block w-full sm:w-1/3 md:w-1/4 lg:w-1/4 bg-gray-200 border-r border-gray-300`}
      >
        <SideBar setSelectedChat={handleChatSelect} />
      </div>

      {/* ChatWindow */}
      <div
        className={`${
          showChatWindow ? "block" : "hidden"
        } sm:block w-full sm:w-2/3 md:w-3/4 lg:w-2/3`}
      >
        <ChatWindow
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
        <button
          onClick={handleBackToSidebar}
          className="sm:hidden bg-blue-500 text-white p-2 m-2 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Chat;
