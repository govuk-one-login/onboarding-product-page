Feature: Design patterns page

  Background:
    Given that the user is on the "/decide/design-patterns" page

  @wip
  Scenario: The user wants to view the design pattern

    When they click on the "design patterns" link
    Then they should be directed to a page with the title "GOV.UK Sign In: Design patterns – Figma"
