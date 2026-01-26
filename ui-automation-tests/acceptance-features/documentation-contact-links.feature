Feature: Common links users can click to contact the service

  Scenario Outline:
    Given that the user is on the <page> page
    And the "contact us" link will point to the following page: "/support"

    Examples:
      | page                           |
      | "/documentation/user-journeys" |
