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
    setSuggestions(filteredSuggestions); // Update suggestions based on input
    setShowSuggestions(true); // Show suggestions when user types

    // Set info alert based on whether there are matching suggestions
    let infoText;
    if (filteredSuggestions.length === 0) {
      infoText =
        "We can not find the city you are looking for. Please try another city";
    } else {
      infoText = "";
    }
    setInfoAlert(infoText);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    if (!value) return;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
    setInfoAlert("");
  };

  const handelInputFocus = () => {
    setSuggestions(allLocations); // Show all locations when input is focused
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        value={query}
        onChange={handleInputChange}
        onFocus={handelInputFocus}
        placeholder="Search for a city"
      />
      {showSuggestions && suggestions.length > 0 && (
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
      {showSuggestions && suggestions.length === 0 && (
        <p className="no-suggestions" role="alert">
          <i>No matching suggestions</i>
        </p>
      )}
    </div>
  );
};

export default CitySearch;
