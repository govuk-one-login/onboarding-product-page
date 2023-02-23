Feature: A navigation menu on the left hand side of some pages

  Scenario Outline:

    Given that the user is on the <page> page
    Then the left-hand navigation menu is displayed
    And the <link> link is the active item

    Examples:
      | page                                    | link                                                        |
      | "/documentation"                        | "Technical documentation"                                   |
      | "/documentation/user-journeys"          | "User journey maps"                                         |
      | "/documentation/design-recommendations" | "Design recommendations" |
      | "/documentation/design-recommendations/save-progress" | "Let users create an account to save progress" |
      | "documentation/design-recommendations/change-credentials" | "Show users where to change their GOV.UK One Login credentials" |
