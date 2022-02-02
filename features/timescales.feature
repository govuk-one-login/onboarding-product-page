Feature:

  As a Service team user
  I want to know when the service is going to be rolled out
  So that I can decide if the service is right for my team

  Background:

    Given that the user is on the "/decide/timescales/" page


  Scenario: The user wants to view GPG45

    Then the "Good Practice Guide 45" link will point to the following URL: "https://www.gov.uk/government/publications/identity-proofing-and-verification-of-an-individual"

  Scenario: User wants to view the Alpha report

    Then the "alpha" link will point to the following URL: "https://www.gov.uk/service-standard-reports/gov-dot-uk-sign-in-end-user-digital-identity-checks"
