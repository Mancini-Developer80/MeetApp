import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  test("renders input field with default value of 32", () => {
    const { getByLabelText } = render(
      <NumberOfEvents onNumberChange={() => {}} setErrorAlert={() => {}} />
    );
    const numberInput = getByLabelText("Number of Events:");
    expect(numberInput).toHaveValue(32); // Default value is 32
  });

  test("updates value when user changes input", () => {
    const mockOnNumberChange = jest.fn();
    const mockSetErrorAlert = jest.fn();
    const { getByLabelText } = render(
      <NumberOfEvents
        onNumberChange={mockOnNumberChange}
        setErrorAlert={mockSetErrorAlert}
      />
    );
    const numberInput = getByLabelText("Number of Events:");

    // Simulate user changing the input value to a valid number
    fireEvent.change(numberInput, { target: { value: "15" } });
    expect(numberInput.value).toBe("15"); // Input should update to the new value
    expect(mockOnNumberChange).toHaveBeenCalledWith("15"); // Callback called with new value
    expect(mockSetErrorAlert).toHaveBeenCalledWith(""); // No error for valid input
  });

  test("shows error for numbers less than 1", () => {
    const mockOnNumberChange = jest.fn();
    const mockSetErrorAlert = jest.fn();
    const { getByLabelText } = render(
      <NumberOfEvents
        onNumberChange={mockOnNumberChange}
        setErrorAlert={mockSetErrorAlert}
      />
    );
    const numberInput = getByLabelText("Number of Events:");

    // Simulate entering a value below the lower boundary (0)
    fireEvent.change(numberInput, { target: { value: "0" } });
    expect(mockSetErrorAlert).toHaveBeenCalledWith(
      "Please enter a valid number of events (1-100)."
    );
    expect(mockOnNumberChange).not.toHaveBeenCalled();
  });

  test("shows error for numbers greater than 100", () => {
    const mockOnNumberChange = jest.fn();
    const mockSetErrorAlert = jest.fn();
    const { getByLabelText } = render(
      <NumberOfEvents
        onNumberChange={mockOnNumberChange}
        setErrorAlert={mockSetErrorAlert}
      />
    );
    const numberInput = getByLabelText("Number of Events:");

    // Simulate entering a value above the upper boundary (101)
    fireEvent.change(numberInput, { target: { value: "101" } });
    expect(mockSetErrorAlert).toHaveBeenCalledWith(
      "Please enter a valid number of events (1-100)."
    );
    expect(mockOnNumberChange).not.toHaveBeenCalled();
  });

  test("shows error for non-numeric input", () => {
    const mockOnNumberChange = jest.fn();
    const mockSetErrorAlert = jest.fn();
    const { getByLabelText } = render(
      <NumberOfEvents
        onNumberChange={mockOnNumberChange}
        setErrorAlert={mockSetErrorAlert}
      />
    );
    const numberInput = getByLabelText("Number of Events:");

    // Simulate entering a non-numeric value
    fireEvent.change(numberInput, { target: { value: "abc" } });
    expect(mockSetErrorAlert).toHaveBeenCalledWith(
      "Please enter a valid number of events (1-100)."
    );
    expect(mockOnNumberChange).not.toHaveBeenCalled();
  });

  // --- Boundary Tests ---

  test("accepts the lower boundary value of 1", () => {
    const mockOnNumberChange = jest.fn();
    const mockSetErrorAlert = jest.fn();
    const { getByLabelText } = render(
      <NumberOfEvents
        onNumberChange={mockOnNumberChange}
        setErrorAlert={mockSetErrorAlert}
      />
    );
    const numberInput = getByLabelText("Number of Events:");

    // Simulate entering the lowest valid value
    fireEvent.change(numberInput, { target: { value: "1" } });
    expect(numberInput.value).toBe("1");
    expect(mockOnNumberChange).toHaveBeenCalledWith("1");
    expect(mockSetErrorAlert).toHaveBeenCalledWith(""); // No error expected
  });

  test("accepts the upper boundary value of 100", () => {
    const mockOnNumberChange = jest.fn();
    const mockSetErrorAlert = jest.fn();
    const { getByLabelText } = render(
      <NumberOfEvents
        onNumberChange={mockOnNumberChange}
        setErrorAlert={mockSetErrorAlert}
      />
    );
    const numberInput = getByLabelText("Number of Events:");

    // Simulate entering the highest valid value
    fireEvent.change(numberInput, { target: { value: "100" } });
    expect(numberInput.value).toBe("100");
    expect(mockOnNumberChange).toHaveBeenCalledWith("100");
    expect(mockSetErrorAlert).toHaveBeenCalledWith(""); // Expect no error
  });
});
