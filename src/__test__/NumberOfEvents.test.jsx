import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsComponent;
  const mockOnNumberChange = jest.fn();

  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents onNumberChange={mockOnNumberChange} />
    );
  });

  test("renders input field", () => {
    const input = NumberOfEventsComponent.queryByRole("spinbutton");
    expect(input).toBeInTheDocument();
  });

  test("default value is 32", () => {
    const input = NumberOfEventsComponent.queryByRole("spinbutton");
    expect(input).toHaveValue(32);
  });

  test("updates value when user types", async () => {
    const user = userEvent.setup();
    const input = NumberOfEventsComponent.queryByRole("spinbutton");

    // Simulate typing: backspace twice and then type "10"
    await user.type(input, "{backspace}{backspace}10");

    expect(input).toHaveValue(10);
    expect(mockOnNumberChange).toHaveBeenCalledWith(10);
  });
});
