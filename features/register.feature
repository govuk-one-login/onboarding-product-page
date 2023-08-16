Feature: A form so users can register to get started with GOV.UK One Login

  Background:
    Given that the user is on the "/register" page

  Rule: The user tries to submit a first name when registering to get started with GOV.UK One Login
    Scenario: The user does not enter any value into the First name field
      When they submit the first name ""
      Then the error message with the text "Enter your first name" must be displayed for the first name field

  Rule: The user tries to submit a last name when registering to get started with GOV.UK One Login
    Scenario: The user does not enter any value into the Last name field
      When they submit the last name ""
      Then the error message with the text "Enter your last name" must be displayed for the last name field

  Rule: The user tries to submit an email address when registering to get started with GOV.UK One Login
    Scenario: The user does not enter any value into the email field
      When they submit the email ""
      Then the error message with the text "Enter your government email address" must be displayed for the email field

    Scenario: The user enters an invalid email address
      When they submit the email "invalid test email"
      Then the error message with the text "Enter an email address in the correct format, like name@gov.uk" must be displayed for the email field

    Scenario: The user enters a non-government email address
      When they submit the email "bill@microsoft.com"
      Then the error message with the text "Enter a government email address" must be displayed for the email field

  Rule: The user tries to submit a role when registering to get started with GOV.UK One Login
    Scenario: The user does not enter any value into the role field
      When they submit the role ""
      Then the error message with the text "Enter your role or job title" must be displayed for the role field

  Rule: The user tries to submit an organisation name when registering to get started with GOV.UK One Login
    Scenario: The user does not enter any value into the organisation name field
      When they submit the organisation name ""
      Then the error message with the text "Enter your organisation name" must be displayed for the organisation name field

  Rule: The user tries to select and submit an Organisation type when registering to get started with GOV.UK One Login
    Scenario: The user does not select any value from organisation type radio button
      When they try to submit the form without selecting any value from the radio button
      Then the error message with the text "Select one option" must be displayed for the organisation type field

  Rule: The user tries to submit a service name when registering to get started with GOV.UK One Login
    Scenario: The user does not enter any value into the service name field
      When they submit the service name ""
      Then the error message with the text "Enter the name of your service" must be displayed for the service name field

  Rule: The user tries to submit a service description when registering to get started with GOV.UK One Login
    Scenario: The user does not enter any value into the service description field
      When they submit the service description ""
      Then the error message with the text "Enter a short description of your service" must be displayed for the service description field

  Rule: The user tries to select and submit a Total annual number of users when registering to get started with GOV.UK One Login
    Scenario: The user does not select any value from total annual number of users radio button
      When they try to submit the form without selecting any value from the radio button
      Then the error message with the text "Select one option" must be displayed for the total annual number of users of your service field

  Rule: The user tries to submit an estimated date for your service to go live when registering to get started with GOV.UK One Login
    Scenario: The user does not enter any value into the estimated date for your service to go live field
      When they submit the estimated date for your service to go live ""
      Then the error message with the text "Enter a month and year" must be displayed for the estimated date for your service to go live field

  Rule: The user tries to select and submit What would you like to access and test when registering to get started with GOV.UK One Login
    Scenario: The user does not select any value from what would you like to access and test radio button
      When they try to submit the form without selecting any value from the radio button
      Then the error message with the text "Select one option" must be displayed for the what would you like to access and test field

  Rule: The user tries to select and submit What would you like help with? when registering to get started with GOV.UK One Login
    Scenario: The user does not select any value from What would you like help with? checkbox list
      When they try to submit the form without selecting any value from the checkbox list
      Then the error message with the text "Select one or more options" must be displayed for the what would you like help with field

    Scenario: The user selects Other value from What would you like help with? checkbox list, but does not enter text into the textfield
      When they select the Other value and do not enter any text into the Could you explain what you’d like help with? textfield and try to submit the form
      Then the error message with the text "Enter a short description of what you need help with" must be displayed for the explain what you would like help with field

  Rule: The user tries to select and submit Do you have any other services you’d like to talk to us about when registering to get started with GOV.UK One Login
    Scenario: The user does not select any value from Do you have any other services you’d like to talk to us about radio button
      When they try to submit the form without selecting any value from the radio button
      Then the error message with the text "Select one option" must be displayed for the any other services you would like to talk to us about field

  Rule: The user tries to select and submit Would you like to get updates about GOV.UK One Login when registering to get started with GOV.UK One Login
    Scenario: The user does not select any value from Would you like to get updates about GOV.UK One Login radio button
      When they try to submit the form without selecting any value from the radio button
      Then the error message with the text "Select one option" must be displayed for the would you like to get updates field

  Rule: The user tries to submit the form when registering to get started with GOV.UK One Login
    Scenario: The user successfully submits the form
      When they fill in correct data in all the mandatory input fields, select buttons, and check lists
      When they select the Submit button
      Then their data is saved in the spreadsheet
      And they should be directed to the following page: "/register-confirm"
      And they should see the text "You have registered to get started with GOV.UK One Login"
