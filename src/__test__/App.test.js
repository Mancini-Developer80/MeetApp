import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "../App";
import { extractLocations } from "../api";
import mockData from "../mock-data";

describe("<App /> component", () => {
  test("renders list of events", () => {
    const { container } = render(<App />);
    expect(container.querySelector("#event-list")).toBeInTheDocument();
  });

  test("renders CitySearch", () => {
    const { container } = render(<App />);
    expect(container.querySelector("#city-search")).toBeInTheDocument();
  });

  test("renders NumberOfEvents", () => {
    const { container } = render(<App />);
    expect(container.querySelector("#number-of-events")).toBeInTheDocument();
  });

  test("updates number of events when handleNumberChange is called", () => {
    const { getByTestId } = render(<App />);
    const numberInput = getByTestId("number-of-events-input");

    // Simulate changing the number of events
    fireEvent.change(numberInput, { target: { value: "10" } });
    expect(numberInput).toHaveValue(10);
  });

  test("renders the correct number of events after changing the number of events", () => {
    const { getByTestId, container } = render(<App />);
    const numberInput = getByTestId("number-of-events-input");

    // Simulate changing the number of events
    fireEvent.change(numberInput, { target: { value: "2" } });

    // Check that only 2 events are rendered
    const eventItems = container.querySelectorAll("#event-list li");
    expect(eventItems.length).toBe(2);
  });
});

describe("extractLocations", () => {
  test("returns unique locations from events", () => {
    const locations = extractLocations(mockData);

    // Check that the locations array contains unique values
    const uniqueLocations = [
      ...new Set(mockData.map((event) => event.location)),
    ];
    expect(locations).toEqual(uniqueLocations);
  });
});
