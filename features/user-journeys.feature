Feature: User journeys page

  Background:
    Given that the user is on the "/decide/user-journeys" page

  @wip
  Scenario: The user wants to view the Account Creation journey

    When they click on the "creating an account at the start of your service journey" link
    Then they should be directed to a page with the title "GOV.UK Sign In: Creating an account at the start of your service journey – Figma"

  @wip
  Scenario: The user wants to view the Save and Resume journey

    When they click on the "save their progress and come back later" link
    Then they should be directed to a page with the title "GOV.UK Sign In: Save progress and come back later – Figma"
