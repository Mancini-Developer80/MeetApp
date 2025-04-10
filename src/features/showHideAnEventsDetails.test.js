import React from "react";
import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  test("An event element is collapsed by default.", ({ given, when, then }) => {
    let AppComponent;
    given("the user is on the events page", async () => {
      AppComponent = render(<App />);
    });

    when("the page loads", async () => {
      await waitFor(() => {
        expect(screen.getByRole("list")).toBeInTheDocument();
      });
    });

    then("the event details for all events should be hidden", async () => {
      const eventDetails = screen.queryAllByTestId("event-details");
      eventDetails.forEach((details) => {
        expect(details).not.toBeInTheDocument();
      });
    });
  });

  test("User can expand an event to see details.", ({
    given,
    and,
    when,
    then,
  }) => {
    let AppComponent;
    given("the user is on the events page", async () => {
      AppComponent = render(<App />);
    });

    and("event details are hidden", async () => {
      await waitFor(() => {
        expect(screen.getByRole("list")).toBeInTheDocument();
      });
      const eventDetails = screen.queryAllByTestId("event-details");
      eventDetails.forEach((details) => {
        expect(details).not.toBeInTheDocument();
      });
    });

    when("the user clicks on an event", async () => {
      await waitFor(() => {
        expect(
          screen.getAllByRole("button", { name: "Show Details" }).length
        ).toBeGreaterThan(0);
      });
      const event = screen.getAllByRole("button", { name: "Show Details" })[0];
      await userEvent.click(event);
    });

    then("the event details should be displayed", async () => {
      await waitFor(() => {
        expect(screen.getByTestId("event-details")).toBeInTheDocument();
      });
    });
  });

  test("User can collapse an event to hide details", ({
    given,
    and,
    when,
    then,
  }) => {
    let AppComponent;
    given("the user is on the events page", async () => {
      AppComponent = render(<App />);
    });

    and("event details are displayed for an event", async () => {
      await waitFor(() => {
        expect(screen.getByRole("list")).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(
          screen.getAllByRole("button", { name: "Show Details" }).length
        ).toBeGreaterThan(0);
      });
      const event = screen.getAllByRole("button", { name: "Show Details" })[0];
      await userEvent.click(event);
      await waitFor(() => {
        expect(screen.getByTestId("event-details")).toBeInTheDocument();
      });
    });

    when("the user clicks on the same event", async () => {
      const event = screen.getAllByRole("button", { name: "Hide Details" })[0];
      await userEvent.click(event);
    });

    then("the event details should be hidden", async () => {
      await waitFor(() => {
        expect(screen.queryByTestId("event-details")).not.toBeInTheDocument();
      });
    });
  });
});
