import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  test("renders input field with default value of 32", () => {
    const { getByTestId } = render(
      <NumberOfEvents onNumberChange={() => {}} />
    );
    const numberInput = getByTestId("number-of-events-input");
    expect(numberInput).toHaveValue(32); // Default value is 32
  });

  test("updates value when user changes input", () => {
    const mockOnNumberChange = jest.fn();
    const { getByTestId } = render(
      <NumberOfEvents onNumberChange={mockOnNumberChange} />
    );
    const numberInput = getByTestId("number-of-events-input");

    // Simulate user changing the input value
    fireEvent.change(numberInput, { target: { value: "10" } });
    expect(numberInput).toHaveValue(10); // Input value should update
    expect(mockOnNumberChange).toHaveBeenCalledWith(10); // Callback should be called with the new value
  });
  test("does not allow numbers less than 1", () => {
    const { getByTestId } = render(
      <NumberOfEvents onNumberChange={() => {}} />
    );
    const input = getByTestId("number-of-events-input");
    fireEvent.change(input, { target: { value: "0" } });
    expect(input.value).toBe("0");
  });
});
