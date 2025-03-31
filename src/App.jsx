import React, { useState } from "react";
import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import mockData from "./mock-data";

const App = () => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [events, setEvents] = useState(mockData.slice(0, numberOfEvents)); // Initialize events state

  const handleNumberChange = (number) => {
    setNumberOfEvents(number);
    setEvents(mockData.slice(0, number)); // Update events state based on the number of events
  };

  return (
    <div className="App">
      <CitySearch />
      <NumberOfEvents onNumberChange={handleNumberChange} />
      <EventList events={events} /> {/* Use the events state */}
    </div>
  );
};

export default App;
