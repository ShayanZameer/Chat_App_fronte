import React from "react";

const SearchBar = () => {
  return (
    <div className="p-4 border-b">
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 rounded-md border focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
