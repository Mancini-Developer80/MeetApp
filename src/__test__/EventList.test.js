import React from "react";
import { render } from "@testing-library/react";
import EventList from "../components/EventList";
import { getEvents } from "../api";

describe("<EventList /> component", () => {
  let EventListComponent;
  beforeEach(() => {
    // Pass an empty array as the default events prop
    EventListComponent = render(<EventList events={[]} />);
  });

  test('has an element with "list" role', () => {
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
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
    expect(eventItems.length).toBe(0);
  });
  test("renders no events when events prop is undefined", () => {
    const { container } = render(<EventList />);
    const eventItems = container.querySelectorAll("li");
    expect(eventItems.length).toBe(0);
  });
});
