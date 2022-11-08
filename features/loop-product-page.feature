Feature: To Identify the issue DFA-2208 - where product page goes down for 15-20 minutes on random intervals.

  Scenario: To Identify the issue DFA-2208

    Given that the user is on the "/" page
    Then "/" product page is called 100000 times
