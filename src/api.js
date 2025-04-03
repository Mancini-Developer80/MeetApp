import mockData from "./mock-data";

/**
 * Extracts unique locations from the events array.
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

/**
 * Fetches the list of all events.
 */
export const getEvents = async () => {
  return mockData;
};
