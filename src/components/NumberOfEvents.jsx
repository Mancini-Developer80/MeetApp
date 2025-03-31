import React, { useState } from "react"; // Import useState

const NumberOfEvents = ({ onNumberChange }) => {
  const [number, setNumber] = useState(32);

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10) || 0;
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
