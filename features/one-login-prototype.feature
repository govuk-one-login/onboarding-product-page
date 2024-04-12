Feature: One login prototype Documentation page

  Background:
    Given that the user is on the "/documentation" page
    When they click on the "GOV.UK One Login prototype" link

  Scenario: Read the GOV.UK One Login prototype documentation
    Then they should be directed to a page with the title "GOV.UK One Login prototype - GOV.UK One Login"

  Scenario: Get Access to prototype
    When they click on the 'Get access' button-link
    Then they should be directed to the following page: '/documentation/end-to-end-prototype/enter-email-address'

  Rule: User accessing the one login prototype
    Background: user navigating to enter email page
      Given they click on the 'Get access' button-link

    Scenario: Back link navigates to onelogin prototype documentation
      When they click on the 'Back' link
      Then they should be directed to the following page: '/documentation/end-to-end-prototype/identity-journeys'

    Scenario: cancel link navigates to onelogin prototype documentation
      When they click on the 'Cancel' link
      Then they should be directed to the following page: '/documentation/end-to-end-prototype/identity-journeys'

    Scenario Outline: Invalid email address
      When they submit the email '<email>'
      Then the error message with the text '<errorMsg>' must be displayed for the email field
      Examples:
        | email            | errorMsg                                                       |
        |                  | Enter your government email address                            |
        | test             | Enter an email address in the correct format, like name@gov.uk |
        | test@            | Enter an email address in the correct format, like name@gov.uk |
        | test@gmail.com   | Enter a government email address                               |
        | test@test.gov.uk | Enter a government email address                               |

    Scenario: Submit a valid email to get access
      When they submit the email 'test@gov.uk'
      Then they should see the text 'Email address sent'

    Scenario: Go back to documentation link navigates to One Login prototype page
      When they submit the email 'test@gov.uk'
      Then they should see the text 'Email address sent'
      When they click on the 'Go back to documentation' link
      Then they should be directed to a page with the title "GOV.UK One Login prototype - GOV.UK One Login"