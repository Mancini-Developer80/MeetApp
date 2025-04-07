import React, { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <li className="event">
      <h2>{event.summary}</h2>
      <p>{event.location}</p>
      {showDetails && (
        <>
          <p className="details">{event.description}</p>
          <p>Created: {event.created}</p>
          <p>{event.start.dateTime}</p>
          <p>{event.end.dateTime}</p>
        </>
      )}
      <button className="details-btn" onClick={handleToggleDetails}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
    </li>
  );
};

export default Event;
