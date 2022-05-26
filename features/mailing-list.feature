Feature: A mailing list form so users can subscribe to mailing list

  Scenario: User subscribes to mailing list and fills in the form correctly

    Given that the users enter alphanumeric characters into all of the fields in the mailing list form
    When they select the Submit button
    Then their data is saved in the spreadsheet
    And they should be directed to the following page: "/mailing-list/confirmation"
    And they should see the text "You have signed up to the GOV.UK Sign In mailing list"

  Scenario: The user doesn't complete the name field

    Given that the users enter alphanumeric characters into all of the fields in the mailing list form except the name field
    When they select the Submit button
    Then the error message "Enter your name" must be displayed for the "personalName" field
