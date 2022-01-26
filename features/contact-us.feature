Feature: A contact us form so users can contact us

  Scenario: Check if there are unknown incidents

    Given that the user is on the "/contact-us" page
    When they click on the "status page" link
    Then they should be directed to the following URL: "https://verifystatus.digital.cabinet-office.gov.uk/"

  Scenario: User contacts us and fills in the form correctly

    Given that the users enter alphanumeric characters into all of the fields in the contact us form
    When they select the Submit button
    Then they should be directed to the following page: "/contact-us-submitted"
    And their data is sent to Zendesk

  Scenario: The user doesn't complete the name field

    Given that the users enter alphanumeric characters into all of the fields in the contact us form except the name field
    When they select the Submit button
    Then the error message "Enter your name" must be displayed for the "name" field

  Scenario: The user doesn't complete the email field

    Given that the users enter alphanumeric characters into all of the fields in the contact us form except the email field
    When they select the Submit button
    Then the error message "Enter your government email address" must be displayed for the "email" field

  Scenario: The user doesn't complete the role field

    Given that the users enter alphanumeric characters into all of the fields in the contact us form except the role field
    When they select the Submit button
    Then the error message "Enter your role" must be displayed for the "role" field

  Scenario: The user doesn't complete the organisation field

    Given that the users enter alphanumeric characters into all of the fields in the contact us form except the organisation-name field
    When they select the Submit button
    Then the error message "Enter the name of your organisation" must be displayed for the "organisation-name" field

  Scenario: The user doesn't complete the service field

    Given that the users enter alphanumeric characters into all of the fields in the contact us form except the service-name field
    When they select the Submit button
    Then the error message "Enter the name of your service" must be displayed for the "service-name" field

  Scenario: The user doesn't tell us how we can help

    Given that the users enter alphanumeric characters into all of the fields in the contact us form except the how-can-we-help field
    When they select the Submit button
    Then the error message "Tell us how we can help" must be displayed for the "how-can-we-help" field

  Scenario: The user enters an invalid email

    Given that the user enters an invalid email address into the email field of the contact us form
    When they select the Submit button
    Then the error message "Enter an email address in the correct format, like name@gov.uk" must be displayed for the "email" field

  Scenario: The users enter a non-government email address

    Given that the user enters a non-government email address into the email field of the contact us form
    When they select the Submit button
    Then the error message "Enter a government email address" must be displayed for the "email" field
