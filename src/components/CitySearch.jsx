import React, { useState } from "react";
import Select from "react-select";

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setCurrentCity(selectedOption.value);
    setInfoAlert(""); // Clear the info alert when a city is selected
  };

  const options = allLocations.map((location) => ({
    value: location,
    label: location,
  }));

  return (
    <div id="city-search">
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Search for a city"
        isClearable
        styles={{
          control: (base) => ({
            ...base,
            borderColor: "#ccc",
            boxShadow: "none",
            "&:hover": { borderColor: "#1796d5" },
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#e6f7ff" : "white",
            color: "#333",
            "&:hover": { backgroundColor: "#f0f0f0" },
          }),
        }}
      />
    </div>
  );
};

export default CitySearch;
