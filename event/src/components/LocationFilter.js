const LocationFilter = ({ onSelect }) => {
    // Replace with your blockchain interaction logic to fetch locations (if applicable)
    const locations = []; // Placeholder array
  
    const handleLocationSelect = (location) => {
      onSelect(location); // Placeholder function
    };
  
    return (
      <div className="location-filter">
        {/* Render location dropdown or map component based on your design */}
        {/* If using locations from blockchain, render them as options */}
        <select onChange={(event) => handleLocationSelect(event.target.value)} className="Location-select">
            <option value="">Select Location</option>
          <option value="Ahemdabad">Ahemdabad</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Jaipur">Jaipur</option>
          <option value="Patna">Patna</option>
          <option value="Surat">Surat</option>

          {/* Add location options here dynamically */}
        </select>
      </div>
    );
  };
export default LocationFilter;  