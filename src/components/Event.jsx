import React, { useState } from "react";
import Modal from "./Modal";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <li className="event">
        <h2>{event.summary}</h2>
        <p>{event.location}</p>
        <button className="details-btn" onClick={handleToggleDetails}>
          Show Details
        </button>
      </li>

      {/* Modal for Event Details */}
      <Modal isOpen={showDetails} onClose={handleToggleDetails}>
        <h2>{event.summary}</h2>
        <p>{event.location}</p>
        <div data-testid="event-details">
          <p className="details">
            <em>{event.description}</em>
          </p>
          <p>
            <strong>Created:</strong> {event.created}
          </p>
          <p>
            <strong>Start:</strong> {event.start.dateTime}
          </p>
          <p>
            <strong>End:</strong> {event.end.dateTime}
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Event;
