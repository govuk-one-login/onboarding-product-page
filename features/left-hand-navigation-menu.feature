Feature: A navigation menu on the left hand side of some pages

  Scenario Outline:
    Given that the user is on the <page> page
    Then the left-hand navigation menu is displayed
    And the <link> link is the active item.
    Examples:
      | page                      | link                         |
      | "/decide"                 | Home                         |
      | "/decide/timescales"      | Timescales                   |
      | "/decide/user-journeys"   | User journeys                |
      | "/decide/design-patterns" | Design patterns              |
      | "/decide/private-beta"    | Request to join private beta |

# The left-hand navigation menu is more of a feature than attached to this page
# Maybe have a table with | /page | "link that is current" | and a scenario outline in a different file
#
#  Scenario: Left-hand Navigation menu is embedded into the "Decide if the gov.uk Sign-In is right for your service" page
#
#  The left-hand navigation menu is embedded into the "Decide if the gov.uk Sign-In is right for your service" page
#
#  Scenario: Left-hand Navigation menu is embedded into the "Timescales" page
#
#  The left-hand navigation menu is embedded into the "Timescales" page
#
#  Scenario: Left hand Navigation menu is embedded into the "User journeys" page
#
#  The left-hand navigation menu is embedded into the "User Journeys" page
#
#  Scenario: Left-hand Navigation menu is embedded into "Design patterns" page
#
#  The left-hand navigation menu is embedded into the "Design Patterns" page
#
#  Scenario: Left-hand Navigation is embedded into the "Find out more about our private beta" page
#
#  The left-hand navigation menu is embedded into the "Find out more about our private beta" page
#
