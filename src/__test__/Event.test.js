import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Event from "../components/Event";
import mockData from "../mock-data";

test("renders event title correctly", () => {
  const { getByText } = render(<Event event={mockData[0]} />);
  expect(getByText("React Workshop")).toBeInTheDocument();
});

test("renders event location correctly", () => {
  const { getByText } = render(<Event event={mockData[0]} />);
  expect(getByText("Berlin, Germany")).toBeInTheDocument();
});

test("renders event start and end times correctly", () => {
  const { getByText, queryByText } = render(<Event event={mockData[0]} />);

  // Initially, start and end times should not be visible
  expect(queryByText(mockData[0].start.dateTime)).not.toBeInTheDocument();
  expect(queryByText(mockData[0].end.dateTime)).not.toBeInTheDocument();

  // Click the "Show Details" button to reveal the details
  fireEvent.click(getByText("Show Details"));

  // Now the start and end times should be visible
  expect(getByText(mockData[0].start.dateTime)).toBeInTheDocument();
  expect(getByText(mockData[0].end.dateTime)).toBeInTheDocument();
});

test("renders show details button", () => {
  const { getByText } = render(<Event event={mockData[0]} />);
  expect(getByText("Show Details")).toBeInTheDocument();
});

test("shows event details when 'Show Details' button is clicked", () => {
  const { getByText } = render(<Event event={mockData[0]} />);

  // Initially, details should not be visible
  expect(() => getByText("Learn React with hands-on examples.")).toThrow();

  // Click the "Show Details" button
  fireEvent.click(getByText("Show Details"));

  // Details should now be visible
  expect(getByText("Learn React with hands-on examples.")).toBeInTheDocument();
  expect(getByText("Created: 2025-03-31T09:00:00Z")).toBeInTheDocument();
});

test("hides event details when 'Hide Details' button is clicked", () => {
  const { getByText } = render(<Event event={mockData[0]} />);

  // Click the "Show Details" button to show details
  fireEvent.click(getByText("Show Details"));

  // Details should now be visible
  expect(getByText("Learn React with hands-on examples.")).toBeInTheDocument();

  // Click the "Hide Details" button to hide details
  fireEvent.click(getByText("Hide Details"));

  // Details should now be hidden
  expect(() => getByText("Learn React with hands-on examples.")).toThrow();
  expect(() => getByText("Created: 2025-03-31T09:00:00Z")).toThrow();
});

test("handles missing event fields gracefully", () => {
  const incompleteEvent = {
    summary: "Incomplete Event",
    location: "Unknown Location",
  };

  const { getByText, queryByText } = render(<Event event={incompleteEvent} />);

  // Check that the summary and location are rendered
  expect(getByText("Incomplete Event")).toBeInTheDocument();
  expect(getByText("Unknown Location")).toBeInTheDocument();

  // Check that missing fields do not cause errors
  expect(queryByText("Created:")).not.toBeInTheDocument();
  expect(
    queryByText("Learn React with hands-on examples.")
  ).not.toBeInTheDocument();
});
