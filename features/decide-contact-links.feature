Feature: Common links users can click to contact the service

  Scenario Outline:
    Given that the user is on the <page> page
    Then the Slack link will contain the correct URL
    And the online form link on the main decide page will contain the correct URL

    Examples:
      | page                                     |
      | "/decide"                                |
      | "/decide/user-journeys"                  |
      | "/decide/design-patterns"                |
      | "/decide/private-beta/request-submitted" |
