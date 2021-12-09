Feature: A request private beta form so service teams can request access to the private beta
  Scenario: User requests to join the private beta

    Given that the users enter alphanumeric characters into all of the fields on the form
    When they select the Submit button
    Then they should be directed to the following URL link: "/decide/private-beta/request-submitted"
    And their data is saved in  the Manual onboarding service teams
