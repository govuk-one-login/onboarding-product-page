Feature: A page telling the user who can apply for the private beta

  As a Service team user
  I want to know who can apply for the service
  So that I can decide if I want to apply for the service

  Scenario: The user wants to apply for the service

    Given that the user is on the "/decide/private-beta/" page
    When they click on the "Request to join private beta" button-link
    Then they should be directed to the following page: "/decide/private-beta/request-form"

