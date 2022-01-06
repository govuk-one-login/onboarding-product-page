Feature: A navigation menu on the left hand side of some pages

  Scenario Outline:
    Given that the user is on the <page> page
    Then the left-hand navigation menu is displayed
    And the <link> link is the active item
    Examples:
      | page                      | link                           |
      | "/decide"                 | "Home"                         |
      | "/decide/timescales"      | "Timescales"                   |
      | "/decide/user-journeys"   | "User journeys"                |
      | "/decide/design-patterns" | "Design patterns"              |
      | "/decide/private-beta"    | "Request to join private beta" |
