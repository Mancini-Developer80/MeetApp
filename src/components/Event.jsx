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
        <div data-testid="event-details">
          <p className="details">
            <em> {event.description}</em>
          </p>
          <p>
            <strong>Created:</strong> {event.created}
          </p>
          <p>
            <strong>Start: </strong> {event.start.dateTime}
          </p>
          <p>
            <strong>End: </strong> {event.end.dateTime}
          </p>
        </div>
      )}
      <button className="details-btn" onClick={handleToggleDetails}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
    </li>
  );
};

export default Event;
