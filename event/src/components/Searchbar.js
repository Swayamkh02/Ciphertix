import { useState } from "react";
const Searchbar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
      // Replace with your blockchain interaction logic
      onSearch(searchTerm); // Placeholder function
    };
  
    return (
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search for events..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    );
  };

  export default Searchbar;