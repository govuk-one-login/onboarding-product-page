Feature: A request private beta form so service teams can request access to the private beta

  Scenario: User requests to join the private beta

    Given that the users enter alphanumeric characters into all of the fields in the request access to private beta form
    When they select the Submit button
    Then their data is saved in the spreadsheet
    And they should be directed to the following page: "/decide/private-beta/request-submitted"
    And they should see the text "Thank you for requesting to join our private beta. We’ll be in touch within five working days."

  Scenario: The user doesn't complete the name field

    Given that the users enter alphanumeric characters into all of the fields in the request access to private beta form except the name field
    When they select the Submit button
    Then the error message "Enter your name" must be displayed for the "name" field

  Scenario: The user doesn't complete the email field

    Given that the users enter alphanumeric characters into all of the fields in the request access to private beta form except the email field
    When they select the Submit button
    Then the error message "Enter your government email address" must be displayed for the "email" field

  Scenario: The user doesn't complete the department field

    Given that the users enter alphanumeric characters into all of the fields in the request access to private beta form except the department-name field
    When they select the Submit button
    Then the error message "Enter your department" must be displayed for the "department-name" field

  Scenario: The user doesn't complete the service field

    Given that the users enter alphanumeric characters into all of the fields in the request access to private beta form except the service-name field
    When they select the Submit button
    Then the error message "Enter the name of your service" must be displayed for the "service-name" field

  Scenario: The user enters an invalid email

    Given that the user enters an invalid email address into the email field of the request access to private beta form
    When they select the Submit button
    Then the error message "Enter an email address in the correct format, like name@gov.uk" must be displayed for the "email" field

  Scenario: The users enter a non-government email address

    Given that the user enters a non-government email address into the email field of the request access to private beta form
    When they select the Submit button
    Then the error message "Enter a government email address" must be displayed for the "email" field
