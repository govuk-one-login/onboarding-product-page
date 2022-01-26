Feature: Design patterns page

  Background:
    Given that the user is on the "/decide/design-patterns" page

  Scenario: The user wants to view the design pattern

    When they click on the "design patterns" link
    Then they should be directed to a page with the title "GOV.UK Sign In: Design patterns – Figma"

  Scenario: User wants to contact the service via slack

    And the user wants to contact the service
    When they click on the "Slack channel" link
    Then they should be directed to the following URL: "https://ukgovernmentdigital.slack.com/?redir=%2Farchives%2FC02AQUJ6WTC"

  Scenario: User wants to contact the service via email

    And the user wants to contact the service
    Then they would be able to send an email to the service if they selected the "govuk-sign-in@digital.cabinet-office.gov.uk" link
