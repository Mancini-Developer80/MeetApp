import React, { useState } from "react";

const CitySearch = ({ allLocations, setCurrentCity }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (allLocations && allLocations.length > 0) {
      const filteredSuggestions = allLocations.filter((location) =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }

    setShowSuggestions(true);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value); // Update the query with the selected suggestion
    setShowSuggestions(false); // Hide the suggestions list
    setCurrentCity(value); // Update the global state currentCity in App
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a city"
      />
      {showSuggestions && (
        <ul className="suggestions" role="list">
          {suggestions.map((suggestion) => (
            <li role="listitem" onClick={handleItemClicked} key={suggestion}>
              {suggestion}
            </li>
          ))}
          <li role="listitem" key="See all cities" onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
