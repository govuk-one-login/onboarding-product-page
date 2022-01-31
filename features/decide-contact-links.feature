Feature: Common links users can click to contact the service

  Scenario Outline:
    Given that the user is on the <page> page
    Then the slack link will contain the correct URL
    And the email link will contain the correct URL

    Examples:
      | page                                     |
      | "/decide"                                |
      | "/decide/user-journeys"                  |
      | "/decide/design-patterns"                |
      | "/decide/private-beta/request-submitted" |