Feature: User journeys page

  Background:
    Given that the user is on the "/decide/user-journeys" page

  Scenario: The user wants to view the Account Creation journey

    Then the "creating an account at the start of your service journey" link will point to the following URL: "https://www.figma.com/file/RzY1fO1lYpswP2edV3vILh/GOV.UK-Sign-In:-Creating-an-account-at-the-start-of-your-service-journey?node-id=0%3A1"

  Scenario: The user wants to view the Save and Resume journey

    Then the "save their progress and come back later" link will point to the following URL: "https://www.figma.com/file/1OXGHOMdwGyOMjsafCnniy/GOV.UK-Sign-In:-Save-progress-and-come-back-later?node-id=0%3A1"
