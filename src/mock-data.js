const mockData = [
  {
    id: 1,
    location: "Berlin, Germany",
    summary: "React Workshop",
    description: "Learn React with hands-on examples.",
    created: "2025-03-31T09:00:00Z", // Added created key
    start: { dateTime: "2025-04-01T10:00:00Z" },
    end: { dateTime: "2025-04-01T12:00:00Z" },
  },
  {
    id: 2,
    location: "New York, USA",
    summary: "JavaScript Conference",
    description: "A conference about JavaScript.",
    created: "2025-04-15T08:00:00Z", // Added created key
    start: { dateTime: "2025-05-01T09:00:00Z" },
    end: { dateTime: "2025-05-01T17:00:00Z" },
  },
  {
    id: 3,
    location: "London, UK",
    summary: "Node.js Meetup",
    description: "Discuss the latest in Node.js development.",
    created: "2025-03-20T14:00:00Z", // New event with created key
    start: { dateTime: "2025-04-10T18:00:00Z" },
    end: { dateTime: "2025-04-10T20:00:00Z" },
  },
];

export default mockData;
