Feature: A base template that is used for pages that are not part of the evaluate stage.

  Background:
    Given that the user is on the "/" page
    And the user is browsing with a viewport 640 pixels wide

  Scenario Outline:
    When the user clicks the button with the text "Menu"
    Then they should see a menu item <menu item> that points to the page <page>

    Examples:

      | menu item       | page               |
      | "About"         | "/about"           |
      | "Documentation" | "/documentation"   |
      | "Support"       | "/support"         |
      | "Get started"   | "/getting-started" |
