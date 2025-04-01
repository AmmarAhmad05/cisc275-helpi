import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchBar;
