Feature: Common links users can click to contact the service

  Scenario Outline:
    Given that the user is on the <page> page
    And the "contact us" link will point to the following page: "/contact-us"

    Examples:
      | page                                    |
      | "/documentation/user-journeys"          |
      | "/documentation/design-recommendations" |
