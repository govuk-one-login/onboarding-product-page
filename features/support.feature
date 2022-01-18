Feature: A support page which directs users to the correct type of support

  Background:
    Given that the user is on the "/support" page

    Scenario: the user is an end-user
      When the user selects the "I’m a member of the public" radio button
      And they select the "continue" button
      Then they should be directed to the following page: "/contact-us?supportType=PUBLIC"

    Scenario: the user is from a new service team
      When the user selects the "I work in a government service team and we want to start using GOV.UK Sign In" radio button
      And they select the "continue" button
      Then they should be directed to the following page: "/contact-us-details"

    Scenario: the user is from a service team having issues
      When the user selects the "I work in a government service team that is setting up or already using GOV.UK Sign In" radio button
      And they select the "continue" button
      Then they should be directed to the following page: "/service-team-support-form"

    Scenario: the user doesn't pick an option
      When they select the "continue" button
      Then the error message "You must select an option to tell us what you need help with" must be displayed for the "support" radios