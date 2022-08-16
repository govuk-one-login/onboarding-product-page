Feature: A navigation menu on the left hand side of some pages

  Scenario Outline:

    Given that the user is on the <page> page
    Then the left-hand navigation menu is displayed
    And the <link> link is the active item

    Examples:
      | page                                    | link                                                        |
      | "/documentation"                        | "Technical documentation"                                   |
      | "/documentation/user-journeys"          | "User journey maps"                                         |
      | "/documentation/design-recommendations" | "Design recommendations: ‘create account to save progress’" |
