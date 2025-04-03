import React from "react";
import { render, fireEvent, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { extractLocations, getEvents } from "../api"; // Import getEvents
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

    fireEvent.change(numberInput, { target: { value: "10" } });
    expect(numberInput).toHaveValue(10);
  });

  test("renders the correct number of events after changing the number of events", async () => {
    const { getByTestId, container } = render(<App />);
    const numberInput = getByTestId("number-of-events-input");

    fireEvent.change(numberInput, { target: { value: "2" } });

    await waitFor(() => {
      const eventItems = container.querySelectorAll("#event-list li");
      expect(eventItems.length).toBe(2);
    });
  });
});

describe("<App /> integration", () => {
  test("renders a list of events matching the city selected by the user", async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector("#city-search");
    const CitySearchInput = within(CitySearchDOM).queryByRole("textbox");

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem =
      within(CitySearchDOM).queryByText("Berlin, Germany");
    await user.click(berlinSuggestionItem);

    const EventListDOM = AppDOM.querySelector("#event-list");
    const allRenderedEventItems =
      within(EventListDOM).queryAllByRole("listitem");

    const allEvents = await getEvents(); // Now correctly imported
    const berlinEvents = allEvents.filter(
      (event) => event.location === "Berlin, Germany"
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
  });
});
