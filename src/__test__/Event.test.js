import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Event from "../components/Event";
import mockData from "../mock-data";

test("renders event title correctly", () => {
  const { queryByText } = render(<Event event={mockData[0]} />);
  expect(queryByText("React Workshop")).toBeInTheDocument();
});

test("renders event location correctly", () => {
  const { queryByText } = render(<Event event={mockData[0]} />);
  expect(queryByText("Berlin, Germany")).toBeInTheDocument();
});

test("renders event start time correctly", () => {
  const { queryByText, getByText } = render(<Event event={mockData[0]} />);

  // Initially, the created field should not be visible
  expect(
    queryByText(`Created: ${mockData[0].created}`)
  ).not.toBeInTheDocument();

  // Click the "Show Details" button to reveal the details
  fireEvent.click(getByText("Show Details"));

  // Now the created field should be visible
  expect(queryByText(`Created: ${mockData[0].created}`)).toBeInTheDocument();
});

test("renders show details button", () => {
  const { queryByText } = render(<Event event={mockData[0]} />);
  expect(queryByText("Show Details")).toBeInTheDocument();
});

test("shows event details when 'Show Details' button is clicked", () => {
  const { queryByText, getByText } = render(<Event event={mockData[0]} />);

  // Initially, details should not be visible
  expect(
    queryByText("Learn React with hands-on examples.")
  ).not.toBeInTheDocument();
  expect(queryByText("Created: 2025-03-31T09:00:00Z")).not.toBeInTheDocument();

  // Click the "Show Details" button
  fireEvent.click(getByText("Show Details"));

  // Details should now be visible
  expect(
    queryByText("Learn React with hands-on examples.")
  ).toBeInTheDocument();
  expect(queryByText("Created: 2025-03-31T09:00:00Z")).toBeInTheDocument();
});

test("hides event details when 'Hide Details' button is clicked", () => {
  const { queryByText, getByText } = render(<Event event={mockData[0]} />);

  // Click the "Show Details" button to show details
  fireEvent.click(getByText("Show Details"));

  // Details should now be visible
  expect(
    queryByText("Learn React with hands-on examples.")
  ).toBeInTheDocument();

  // Click the "Hide Details" button to hide details
  fireEvent.click(getByText("Hide Details"));

  // Details should now be hidden
  expect(
    queryByText("Learn React with hands-on examples.")
  ).not.toBeInTheDocument();
  expect(queryByText("Created: 2025-03-31T09:00:00Z")).not.toBeInTheDocument();
});
