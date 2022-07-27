Feature: A base template that is used for pages that are not part of the evaluate stage.

  This template is used by the index page so we can run our tests on that page and be confident the functionality
  works in the same way across all the pages which use this template.

  Background:
    Given that the user is on the "/" page
    And the user is browsing with a viewport 640 pixels wide

  Scenario Outline:
    When the user clicks the button with the text "Menu"
    Then they should see a menu item <menu item> that points to the page <page>

    Examples:

      | menu item       | page               |
      | "Features"      | "/features"        |
      | "Documentation" | "/documentation"   |
      | "Support"       | "/support"         |
      | "Get started"   | "/getting-started" |
