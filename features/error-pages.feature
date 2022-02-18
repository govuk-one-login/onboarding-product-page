Feature: error pages

  As a Service team user
  I want to be notified about an error

  Scenario: The user enters a URL that does not exist and is shown 404 error page

    Given that the user is on the "/non-existent-error-page" page
    Then they should see the text "Page not found"

  Scenario: The user is on 404 error page and clicks support link

    Given that the user is on the "/non-existent-error-page" page
    Then the "support form" link will point to the following URL: "/support"
