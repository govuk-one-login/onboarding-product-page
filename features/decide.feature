Feature: Decide page

  As a Service team user
  I want to know more information about the service
  So that I can decide if the service is right for my team

  Background:
    Given that the user is on the "/decide" page

  Scenario: The user wants to understand the timescales

    When they click on the "Timescales" link
    Then they should be directed to the following page: "/decide/timescales"

  Scenario: The user wants to view the user journey

    When they click on the "User journeys" link
    Then they should be directed to the following page: "/decide/user-journeys"

  Scenario: The user wants to view design patterns

    When they click on the "Design patterns" link
    Then they should be directed to the following page: "/decide/design-patterns"

  Scenario: Read the technical documentation

    When they click on the "Technical documentation" link
    Then they should be directed to a page with the title "Authentication Technical Docs - Sign In"

  Scenario: Want to join the private beta

    When they click on the "find out more about joining the private beta" link
    Then they should be directed to the following page: "/decide/private-beta"

