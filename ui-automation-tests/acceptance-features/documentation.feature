Feature: Documentation page

  Background:
    Given that the user is on the "/documentation" page

  Scenario: Read the technical documentation

    When they click on the "Technical documentation" link
    Then they should be directed to a page with the title "Technical documentation - GOV.UK One Login"
