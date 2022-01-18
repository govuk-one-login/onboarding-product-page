Feature: Confirmation page when requests to join the private beta have been submitted

  As service team user
  I want confirmation that my request to join private beta has been received
  So that I am confident that the service has the details for my team

  Background:

    Given that the user is on the "/decide/private-beta/request-submitted" page

  Scenario: The user wants to return to the homepage

    When they click on the "Return to the homepage" link
    Then they should be directed to the following page: "/decide"

  Scenario: User wants to contact the service via slack

    When they click on the "Slack channel" link
    Then they should be directed to the following URL: "https://ukgovernmentdigital.slack.com/?redir=%2Farchives%2FC02AQUJ6WTC"

  Scenario: User wants to contact the service via email

    Then they would be able to send an email to the service if they selected the "govuk-sign-in@digital.cabinet-office.gov.uk" link
