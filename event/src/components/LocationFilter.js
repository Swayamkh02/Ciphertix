const LocationFilter = ({ onSelect }) => {
    const locations = []; 
  
    const handleLocationSelect = (location) => {
      onSelect(location); 
    };
  
    return (
      <div className="location-filter">
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