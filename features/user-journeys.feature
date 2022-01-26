Feature: User journeys page

  Background:
    Given that the user is on the "/decide/user-journeys" page

  Scenario: The user wants to view the Account Creation journey

    When they click on the "creating an account at the start of your service journey" link
    Then they should be directed to a page with the title "GOV.UK Sign In: Creating an account at the start of your service journey – Figma"

  Scenario: The user wants to view  the Save and Resume journey

    When they click on the "save their progress and come back later" link
    Then they should be directed to a page with the title "GOV.UK Sign In: Save progress and come back later – Figma"

  Scenario: User wants to contact the service via slack

    And the user wants to contact the service
    When they click on the "Slack channel" link
    Then they should be directed to the following URL: "https://ukgovernmentdigital.slack.com/?redir=%2Farchives%2FC02AQUJ6WTC"

  Scenario:  Want to contact the service via email

    And the user wants to contact the service
    Then they would be able to send an email to the service if they selected the "govuk-sign-in@digital.cabinet-office.gov.uk" link
