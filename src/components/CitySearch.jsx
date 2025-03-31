import React, { useState } from "react"; // Import useState

const CitySearch = ({ allLocations }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    const filteredSuggestions = allLocations.filter((location) =>
      location.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  const handleInputFocus = () => {
    setSuggestions(allLocations); // Show all locations when the textbox gains focus
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus} // Add focus handler
        placeholder="Search for a city"
      />
      {suggestions.length > 0 || query ? (
        <ul className="suggestions">
          {suggestions.length > 0 ? (
            <>
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
              <li>See all cities</li>
            </>
          ) : (
            <li>No suggestions available</li>
          )}
        </ul>
      ) : null}
    </div>
  );
};
export default CitySearch;
