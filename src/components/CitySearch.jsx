import React, { useState } from "react";

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    const filteredSuggestions = allLocations.filter((location) =>
      location.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setShowSuggestions(true);

    // Set info alert if no matching suggestions
    if (filteredSuggestions.length === 0) {
      setInfoAlert(
        "We can not find the city you are looking for. Please try another city"
      );
    } else {
      setInfoAlert("");
    }
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
    setInfoAlert(""); // Clear the info alert when a suggestion is clicked
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
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions" role="list">
          {suggestions.map((suggestion) => (
            <li key={suggestion} onClick={handleItemClicked} role="listitem">
              {suggestion}
            </li>
          ))}
          <li
            key="See all cities"
            onClick={() =>
              handleItemClicked({ target: { textContent: "See all cities" } })
            }
            role="listitem"
          >
            <b>See all cities</b>
          </li>
        </ul>
      )}
      {showSuggestions && suggestions.length === 0 && (
        <p className="no-suggestions" role="alert">
          No matching suggestions
        </p>
      )}
    </div>
  );
};

export default CitySearch;
