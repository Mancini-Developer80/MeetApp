Feature: Show/Hide an Events Details
  Scenario: An event element is collapsed by default.
    Given the user is on the events page
    When the page loads
    Then the event details for all events should be hidden

  Scenario: User can expand an event to see details.
    Given the user is on the events page
    And event details are hidden
    When the user clicks on an event
    Then the event details should be displayed

  Scenario: User can collapse an event to hide details
    Given the user is on the events page
    And event details are displayed for an event
    When the user clicks on the same event
    Then the event details should be hidden