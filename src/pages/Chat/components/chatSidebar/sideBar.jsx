import React from "react";
import ChatHeader from "../chatHeader/ChatHeader";
import SearchBar from "../SearchBar/Searchbar";
import ChatsList from "../ChatList/ChatList";

const SideBar = ({ setSelectedChat }) => {
  return (
    <div className="w-full h-screen bg-white shadow-md">
      <ChatHeader />
      <SearchBar />
      <ChatsList setSelectedChat={setSelectedChat} />
    </div>
  );
};

export default SideBar;
