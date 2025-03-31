import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import EventList from "../components/EventList";
import { extractLocations, getEvents } from "../api";

const mockLocations = ["Berlin", "New York", "London"];

describe("<CitySearch /> component", () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch allLocations={mockLocations} />);
  });

  test("renders text input", () => {
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });

  test("suggestions list is hidden by default", () => {
    const suggestionList = CitySearchComponent.queryByRole("list");
    expect(suggestionList).not.toBeInTheDocument();
  });

  test("renders a list of suggestions when city textbox gains focus", async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.click(cityTextBox);
    const suggestionList = CitySearchComponent.queryByRole("list");
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass("suggestions");
  });

  test("updates list of suggestions correctly when user types in city textbox", async () => {
    const user = userEvent.setup();
    CitySearchComponent.rerender(<CitySearch allLocations={mockLocations} />);

    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    const suggestions = mockLocations.filter((location) =>
      location.toUpperCase().includes(cityTextBox.value.toUpperCase())
    );

    const suggestionListItems = CitySearchComponent.queryAllByRole("listitem");
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  test("renders the suggestion text in the textbox upon clicking on the suggestion", async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole("textbox");

    // Simulate typing in the textbox to show suggestions
    await user.type(cityTextBox, "Berlin");

    // Simulate clicking on the first suggestion
    const BerlinSuggestion = CitySearchComponent.queryAllByRole("listitem")[0];
    await user.click(BerlinSuggestion);

    // Verify that the textbox value matches the clicked suggestion
    expect(cityTextBox).toHaveValue(BerlinSuggestion.textContent);
  });
  test("renders no events when events prop is empty", () => {
    const { container } = render(<EventList events={[]} />);
    const eventItems = container.querySelectorAll("li");
    expect(eventItems.length).toBe(0);
  });
  test("renders 'No suggestions available' when no matching suggestions exist", async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole("textbox");

    // Simulate typing a city name that does not exist in mockLocations
    await user.type(cityTextBox, "NonExistentCity");

    // Check that the "No suggestions available" message is rendered
    const noSuggestionsMessage = CitySearchComponent.queryByText(
      "No suggestions available"
    );
    expect(noSuggestionsMessage).toBeInTheDocument();

    // Ensure no other suggestions are rendered
    const suggestionListItems = CitySearchComponent.queryAllByRole("listitem");
    expect(suggestionListItems.length).toBe(1); // Only the "No suggestions available" message
  });
});
