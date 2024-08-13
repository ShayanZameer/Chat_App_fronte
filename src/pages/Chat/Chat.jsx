import { useState } from "react";
import SideBar from "./components/chatSidebar/sideBar";

import ChatWindow from "./components/ChatWindow/ChatWindow";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex">
      <SideBar setSelectedChat={setSelectedChat} />
      <ChatWindow
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
    </div>
  );
};

export default Chat;
