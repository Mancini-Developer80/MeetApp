import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CitySearch from "../components/CitySearch";

const mockLocations = ["Berlin, Germany", "New York, USA", "London, UK"];

describe("<CitySearch /> component", () => {
  test("renders input field and suggestions list", () => {
    const { getByRole, queryByRole } = render(
      <CitySearch allLocations={mockLocations} setCurrentCity={() => {}} />
    );
    const cityInput = getByRole("textbox");
    expect(cityInput).toBeInTheDocument();

    // Suggestions list should not be visible initially
    const suggestionsList = queryByRole("list");
    expect(suggestionsList).not.toBeInTheDocument();
  });

  test("shows suggestions when user types in the input field", () => {
    const { getByRole, getAllByRole } = render(
      <CitySearch allLocations={mockLocations} setCurrentCity={() => {}} />
    );
    const cityInput = getByRole("textbox");

    // Simulate typing in the input field
    fireEvent.change(cityInput, { target: { value: "Berlin" } });

    // Suggestions list should now be visible
    const suggestionsListItems = getAllByRole("listitem");
    expect(suggestionsListItems).toHaveLength(2); // Includes "Berlin, Germany" and "See all cities"
    expect(suggestionsListItems[0].textContent).toBe("Berlin, Germany");
    expect(suggestionsListItems[1].textContent).toBe("See all cities");
  });

  test("handles empty input gracefully", () => {
    const { getByPlaceholderText } = render(
      <CitySearch allLocations={[]} setCurrentCity={() => {}} />
    );
    const input = getByPlaceholderText("Search for a city");
    fireEvent.change(input, { target: { value: "" } });
    expect(input.value).toBe("");
  });

  test("updates input field and calls setCurrentCity when a suggestion is clicked", () => {
    const mockSetCurrentCity = jest.fn();
    const { getByRole, getAllByRole } = render(
      <CitySearch
        allLocations={mockLocations}
        setCurrentCity={mockSetCurrentCity}
      />
    );
    const cityInput = getByRole("textbox");

    // Simulate typing in the input field
    fireEvent.change(cityInput, { target: { value: "Berlin" } });

    // Click on the first suggestion
    const suggestionsListItems = getAllByRole("listitem");
    fireEvent.click(suggestionsListItems[0]);

    // Input field should update, and setCurrentCity should be called
    expect(cityInput.value).toBe("Berlin, Germany");
    expect(mockSetCurrentCity).toHaveBeenCalledWith("Berlin, Germany");
  });

  test("handles 'See all cities' option correctly", () => {
    const mockSetCurrentCity = jest.fn();
    const { getByRole, getAllByRole } = render(
      <CitySearch
        allLocations={mockLocations}
        setCurrentCity={mockSetCurrentCity}
      />
    );
    const cityInput = getByRole("textbox");

    // Simulate typing in the input field
    fireEvent.change(cityInput, { target: { value: "Berlin" } });

    // Click on the "See all cities" option
    const suggestionsListItems = getAllByRole("listitem");
    fireEvent.click(suggestionsListItems[1]);

    // Input field should update, and setCurrentCity should be called
    expect(cityInput.value).toBe("See all cities");
    expect(mockSetCurrentCity).toHaveBeenCalledWith("See all cities");
  });

  test("handles no matching suggestions gracefully", () => {
    const { getByRole, queryByRole } = render(
      <CitySearch allLocations={mockLocations} setCurrentCity={() => {}} />
    );
    const cityInput = getByRole("textbox");

    // Simulate typing a non-matching query
    fireEvent.change(cityInput, { target: { value: "Nonexistent City" } });

    // Suggestions list should not be visible
    const suggestionsList = queryByRole("list");
    expect(suggestionsList).not.toBeInTheDocument();
  });
});

describe("<CitySearch /> component", () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(
      <CitySearch
        allLocations={[]}
        setCurrentCity={() => {}}
        setInfoAlert={() => {}}
      />
    );
  });
});
