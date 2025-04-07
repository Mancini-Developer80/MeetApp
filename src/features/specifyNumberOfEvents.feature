Feature: Specify number of events.
  Scenario: When user has not specified a number, 32 events are shown by default.
    Given the user is on the events page
    And the user hasn’t specified a number of events to display
    When the page loads
    Then 32 events should be displayed by default

    Scenario: User can change the number of events displayed.
      Given the user is on the events page
      When the user specifies a number of events to display
      Then that number of events should be displayed