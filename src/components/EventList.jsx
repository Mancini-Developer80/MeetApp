import React from "react";
import Event from "./Event";

const EventList = ({ events = [] }) => {
  return (
    <ul id="event-list">
      {events.length > 0 ? (
        events.map((event) => <Event key={event.id} event={event} />)
      ) : (
        <li>No events available</li>
      )}
    </ul>
  );
};

export default EventList;
