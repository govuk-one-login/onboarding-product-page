Feature: Common links users can click to contact the service

  Scenario Outline:
    Given that the user is on the <page> page
    Then the Slack link will contain the correct URL
    And the "online form" link will point to the following page: "/contact-us" with the parameter string <parameter_string>

    Examples:
      | page                                     | parameter_string                               |
      | "/decide"                                | "?source=decide"                                |
      | "/decide/user-journeys"                  | "?source=decide-user-journeys"                  |
      | "/decide/design-patterns"                | "?source=decide-design-patterns"                |
      | "/decide/private-beta/request-submitted" | "?source=decide-private-beta-request-submitted" |
