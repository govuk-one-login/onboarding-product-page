Feature: A mailing list form so users can subscribe to mailing list

  Scenario: User subscribes to mailing list and fills in the form correctly

    Given that the users enter alphanumeric characters into all of the fields in the mailing list form
    When they select the Submit button
    Then their data is saved in the spreadsheet
    And they should be directed to the following page: "/mailing-list/confirmation"
    And they should see the text "You have signed up to the GOV.UK Sign In mailing list"

  Scenario: The user doesn't complete the name field

    Given that the users enter alphanumeric characters into all of the fields in the mailing list form except the Name field
    When they select the Submit button
    Then the error message "Enter your name" must be displayed for the "personalName" field

  Scenario: The user doesn't complete the Organisation name field

    Given that the users enter alphanumeric characters into all of the fields in the mailing list form except the Organisation name field
    When they select the Submit button
    Then the error message "Enter your organisation name" must be displayed for the "organisationName" field

  Scenario: The user doesn't complete the Contact email field

    Given that the users enter alphanumeric characters into all of the fields in the mailing list form except the Contact email field
    When they select the Submit button
    Then the error message "Enter your government email address" must be displayed for the "contactEmail" field

  Scenario: The user doesn't complete the Service name field

    Given that the users enter alphanumeric characters into all of the fields in the mailing list form except the Service name field
    When they select the Submit button
    Then the error message "Enter the name of your service" must be displayed for the "serviceName" field

  Scenario: The user enters an invalid email

    Given that the user enters an invalid email address into the email field of join our mailing list form
    When they select the Submit button
    Then the error message "Enter an email address in the correct format, like name@example.gov.uk" must be displayed for the "contactEmail" field

  Scenario: The users enter a non-government email address

    Given that the user enters a non-government email address into the email field of join our mailing list form
    When they select the Submit button
    Then the error message "Enter a government email address" must be displayed for the "contactEmail" field
