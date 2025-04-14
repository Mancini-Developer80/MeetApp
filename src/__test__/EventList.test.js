import React from "react";
import { render, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Import userEvent
import EventList from "../components/EventList";
import CitySearch from "../components/CitySearch"; // Import CitySearch
import { getEvents, extractLocations } from "../api";
import App from "../App";
import mockData from "../mock-data";

jest.mock("../api", () => ({
  getEvents: jest.fn(() => Promise.resolve(mockData)), // Mock getEvents
  extractLocations: jest.fn((events) => [
    ...new Set(events.map((event) => event.location)),
  ]), // Mock extractLocations
}));

describe("<EventList /> component", () => {
  let EventListComponent;
  beforeEach(() => {
    EventListComponent = render(<EventList events={[]} />);
  });

  test('has an element with "list" role', () => {
    const { queryAllByRole } = render(<EventList events={[]} />);
    const lists = queryAllByRole("list");
    expect(lists.length).toBe(2);
  });

  test("renders correct number of events", async () => {
    const allEvents = await getEvents();
    EventListComponent.rerender(<EventList events={allEvents} />);
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(
      allEvents.length
    );
  });

  test("renders no events when events prop is empty", () => {
    const { container } = render(<EventList events={[]} />);
    const eventItems = container.querySelectorAll("li");
    expect(eventItems.length).toBe(1);
  });

  test("renders no events when events prop is undefined", () => {
    const { container } = render(<EventList />);
    const eventItems = container.querySelectorAll("li");
    expect(eventItems.length).toBe(1);
  });
});

describe("<EventList> integration", () => {
  test("renders a list of 32 events when the app is mounted and rendered", async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector("#event-list");
    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole("listitem");
      expect(EventListItems.length).toBe(32);
    });
  });

  test("renders the suggestion text in the textbox upon clicking on the suggestion", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    const CitySearchComponent = render(
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={() => {}}
        setInfoAlert={() => {}}
      />
    );

    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    const BerlinGermanySuggestion =
      CitySearchComponent.queryAllByRole("listitem")[0];

    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});
