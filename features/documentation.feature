Feature: Documentation page

  As a Service team user
  I want to know more information about the service
  So that I can decide if the service is right for my team

  Background:
    Given that the user is on the "/documentation" page

  Scenario: Read the technical documentation

    When they click on the "Technical documentation" link
    Then they should be directed to a page with the title "Technical documentation - GOV.UK Sign In"
