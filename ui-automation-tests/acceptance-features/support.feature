Feature: A support page which directs users to the correct type of support

  Background:
    Given that the user is on the "/support" page

  Scenario: the user is an end-user
    When the user selects the "I’m a member of the public" radio button
    And they click the "Continue" button
    Then they should be directed to the following URL: "https://home.account.gov.uk/contact-gov-uk-one-login"

  Scenario: the user is from a new service team
    When the user selects the "I work in a government service team and we want to start using GOV.UK One Login" radio button
    And they click the "Continue" button
    Then they should be directed to the following page: "/contact-us-details"

  Scenario: the user is from a service team having issues
    When the user selects the "I work in a government service team that is already using GOV.UK One Login" radio button
    And they click the "Continue" button
    Then they should be directed to the following URL: "https://onelogingovuk.service-now.com/csm?id=csm_sc_cat_item&sys_id=83902cb51b4822900a549978b04bcbed"

  Scenario: the user doesn't pick an option
    When they click the "Continue" button
    Then the error message "You must select an option to tell us what you need help with" must be displayed for the "support" radios
