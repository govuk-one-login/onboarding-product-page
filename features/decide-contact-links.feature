Feature: Common links users can click to contact the service

  Scenario Outline:
    Given that the user is on the <page> page
    Then the Slack link will contain the correct URL
    And the "support form" link will point to the following page: "/contact-us"

    Examples:
      | page                                     |
      | "/decide"                                |
      | "/decide/user-journeys"                  |
      | "/decide/design-patterns"                |
      | "/decide/private-beta/request-submitted" |
