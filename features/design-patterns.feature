Feature: Design patterns page

  Scenario: The user wants to view the design pattern

    Given that the user is on the "/decide/design-patterns" page
    Then the "design patterns" link will point to the following URL: "https://www.figma.com/file/CCC6mk1gkMVUrrvZqoV5rl"