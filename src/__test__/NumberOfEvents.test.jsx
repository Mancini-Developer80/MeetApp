import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  test("renders input field with default value of 10", () => {
    const { getByTestId } = render(
      <NumberOfEvents onNumberChange={() => {}} />
    );
    const numberInput = getByTestId("number-of-events-input");
    expect(numberInput).toHaveValue(10); // Default value is 10
  });

  test("updates value when user changes input", () => {
    const mockOnNumberChange = jest.fn();
    const { getByTestId } = render(
      <NumberOfEvents onNumberChange={mockOnNumberChange} />
    );
    const numberInput = getByTestId("number-of-events-input");

    // Simulate user changing the input value
    fireEvent.change(numberInput, { target: { value: "15" } });
    expect(numberInput).toHaveValue(15); // Input value should update
    expect(mockOnNumberChange).toHaveBeenCalledWith(15); // Callback should be called with the new value
  });

  test("does not allow numbers less than 1", () => {
    const mockOnNumberChange = jest.fn();
    const { getByTestId } = render(
      <NumberOfEvents onNumberChange={mockOnNumberChange} />
    );
    const input = getByTestId("number-of-events-input");

    // Simulate user entering a value less than 1
    fireEvent.change(input, { target: { value: "0" } });
    expect(input).toHaveValue(1); // Input value should reset to 1
    expect(mockOnNumberChange).toHaveBeenCalledWith(1); // Callback should be called with 1
  });

  test("does not allow non-numeric input", () => {
    const mockOnNumberChange = jest.fn();
    const { getByTestId } = render(
      <NumberOfEvents onNumberChange={mockOnNumberChange} />
    );
    const input = getByTestId("number-of-events-input");

    // Simulate user entering a non-numeric value
    fireEvent.change(input, { target: { value: "abc" } });
    expect(input).toHaveValue(10); // Input value should remain the default (10)
    expect(mockOnNumberChange).not.toHaveBeenCalled(); // Callback should not be called
  });
});
