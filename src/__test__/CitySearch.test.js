import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CitySearch from "../components/CitySearch";

const mockLocations = ["Berlin, Germany", "New York, USA", "London, UK"];

describe("<CitySearch /> component", () => {
  test("renders input field and suggestions list initially hidden", () => {
    const mockSetCurrentCity = jest.fn();
    const mockSetInfoAlert = jest.fn();

    const { getByRole, queryByRole } = render(
      <CitySearch
        allLocations={mockLocations}
        setCurrentCity={mockSetCurrentCity}
        setInfoAlert={mockSetInfoAlert}
      />
    );
    const cityInput = getByRole("textbox");
    expect(cityInput).toBeInTheDocument();

    // Suggestions list should not be visible initially
    expect(queryByRole("list")).not.toBeInTheDocument();
  });

  test("shows suggestions when user types in the input field", () => {
    const mockSetCurrentCity = jest.fn();
    const mockSetInfoAlert = jest.fn();

    const { getByRole, getAllByRole } = render(
      <CitySearch
        allLocations={mockLocations}
        setCurrentCity={mockSetCurrentCity}
        setInfoAlert={mockSetInfoAlert}
      />
    );
    const cityInput = getByRole("textbox");

    // Simulate typing in the input field
    fireEvent.change(cityInput, { target: { value: "Berlin" } });

    // The suggestions list should now be visible (including the matching location and "See all cities")
    const suggestionsListItems = getAllByRole("listitem");
    expect(suggestionsListItems).toHaveLength(2);
    expect(suggestionsListItems[0].textContent).toBe("Berlin, Germany");
    expect(suggestionsListItems[1].textContent).toBe("See all cities");

    // Optionally, you can assert that setInfoAlert was called with the empty string for valid input
    expect(mockSetInfoAlert).toHaveBeenCalledWith("");
  });

  test("handles empty input gracefully", () => {
    const mockSetCurrentCity = jest.fn();
    const mockSetInfoAlert = jest.fn();

    const { getByPlaceholderText } = render(
      <CitySearch
        allLocations={[]}
        setCurrentCity={mockSetCurrentCity}
        setInfoAlert={mockSetInfoAlert}
      />
    );
    const input = getByPlaceholderText("Search for a city");
    fireEvent.change(input, { target: { value: "" } });
    expect(input.value).toBe("");
  });

  test("updates input field and calls setCurrentCity when a suggestion is clicked", () => {
    const mockSetCurrentCity = jest.fn();
    const mockSetInfoAlert = jest.fn();

    const { getByRole, getAllByRole } = render(
      <CitySearch
        allLocations={mockLocations}
        setCurrentCity={mockSetCurrentCity}
        setInfoAlert={mockSetInfoAlert}
      />
    );
    const cityInput = getByRole("textbox");

    // Simulate typing in the input field
    fireEvent.change(cityInput, { target: { value: "Berlin" } });

    // Click on the first suggestion ("Berlin, Germany")
    const suggestionsListItems = getAllByRole("listitem");
    fireEvent.click(suggestionsListItems[0]);

    // The input field should update, and setCurrentCity should be called with "Berlin, Germany"
    expect(cityInput.value).toBe("Berlin, Germany");
    expect(mockSetCurrentCity).toHaveBeenCalledWith("Berlin, Germany");
  });

  test("handles 'See all cities' option correctly", () => {
    const mockSetCurrentCity = jest.fn();
    const mockSetInfoAlert = jest.fn();

    const { getByRole, getAllByRole } = render(
      <CitySearch
        allLocations={mockLocations}
        setCurrentCity={mockSetCurrentCity}
        setInfoAlert={mockSetInfoAlert}
      />
    );
    const cityInput = getByRole("textbox");

    // Simulate typing in the input field
    fireEvent.change(cityInput, { target: { value: "Berlin" } });

    // Click on the "See all cities" option
    const suggestionsListItems = getAllByRole("listitem");
    fireEvent.click(suggestionsListItems[1]);

    // The input field should update correctly, and setCurrentCity should be called with "See all cities"
    expect(cityInput.value).toBe("See all cities");
    expect(mockSetCurrentCity).toHaveBeenCalledWith("See all cities");
  });

  test("handles no matching suggestions gracefully", () => {
    const mockSetCurrentCity = jest.fn();
    const mockSetInfoAlert = jest.fn();

    const { getByRole, queryByRole } = render(
      <CitySearch
        allLocations={mockLocations}
        setCurrentCity={mockSetCurrentCity}
        setInfoAlert={mockSetInfoAlert}
      />
    );
    const cityInput = getByRole("textbox");

    // Simulate typing a non-matching query
    fireEvent.change(cityInput, { target: { value: "Nonexistent City" } });

    // The suggestions list should not be visible
    expect(queryByRole("list")).not.toBeInTheDocument();

    // The no suggestions alert should be visible
    const noSuggestionAlert = getByRole("alert");
    expect(noSuggestionAlert).toHaveTextContent("No matching suggestions");

    // Optionally, you can check if setInfoAlert was called with the error message in earlier behavior when there are no matches
    // e.g., expect(mockSetInfoAlert).toHaveBeenCalledWith("We can not find the city you are looking for. Please try another city");
  });
});
