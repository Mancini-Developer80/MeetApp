import React, { useState } from "react";

const NumberOfEvents = ({ onNumberChange, setErrorAlert }) => {
  const [number, setNumber] = useState(32);

  const handleInputChange = (event) => {
    const value = event.target.value;

    if (isNaN(value) || value <= 0 || value > 100) {
      // Set an error message for invalid input
      setErrorAlert("Please enter a valid number of events (1-100).");
    } else {
      // Clear the error message for valid input
      setErrorAlert("");
    }
    setNumber(value);
    onNumberChange(value);
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-input">Number of Events:</label>
      <input
        type="number"
        id="number-input"
        className="number"
        value={number}
        onChange={handleInputChange}
        min="1"
        data-testid="number-of-events-input"
      />
    </div>
  );
};

export default NumberOfEvents;
