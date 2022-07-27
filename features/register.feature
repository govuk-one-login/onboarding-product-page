Feature: A register form so users can sign up to get access to the GOV.UK Sign In demo

  Scenario: User subscribes to mailing list and fills in the form correctly

    Given that the users enter alphanumeric characters into all of the fields
    When they select the Submit button
    Then their data is saved in the spreadsheet
    And they should be directed to the following page: "/register-confirm"
    And they should see the text "You have signed up for access to GOV.UK Sign In"


  Scenario: The user doesn't complete the name field
    Given that the users enter alphanumeric characters into all of the fields in the register form except the Name field
    When they select the Submit button
    Then the error message "Enter your name" must be displayed for the "name" field

  Scenario: The user doesn't complete the Organisation name field

    Given that the users enter alphanumeric characters into all of the fields in the register form except the Organisation name field
    When they select the Submit button
    Then the error message "Enter your organisation name" must be displayed for the "organisation-name" field

  Scenario: The user doesn't complete the Contact email field

    Given that the users enter alphanumeric characters into all of the fields in the register form except the Contact email field
    When they select the Submit button
    Then the error message "Enter your government email address" must be displayed for the "email" field

  Scenario: The user doesn't complete the Service name field

    Given that the users enter alphanumeric characters into all of the fields in the register form except the Service name field
    When they select the Submit button
    Then the error message "Enter the name of your service" must be displayed for the "service-name" field

  Scenario: The user enters an invalid email

    Given that the user enters an invalid email address into the email field
    When they select the Submit button
    Then the error message "Enter an email address in the correct format, like name@gov.uk" must be displayed for the "email" field

  Scenario: The users enter a non-government email address

    Given that the user enters a non-government email address into the email field
    When they select the Submit button
    Then the error message "Enter a government email address" must be displayed for the "email" field


  Scenario: The users doesnt click an option for the emailing list

    Given  that the users enter alphanumeric characters into all of the fields in the register form except the mailing-list radio
    When they select the Submit button
    Then the error message "Select if you’d like to join the mailing list or not" must be displayed for the "mailing-list" field

  Scenario: User selects no for the mailing list

    Given that the users enter alphanumeric characters into all of the fields in the register form and select no for the mailing list
    When they select the Submit button
    Then their data is saved in the spreadsheet
    And they should be directed to the following page: "/register-confirm"
    And they should see the text "You have signed up for access to GOV.UK Sign In"
