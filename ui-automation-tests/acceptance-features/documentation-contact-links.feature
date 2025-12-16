Feature: Common links users can click to contact the service

  Scenario Outline:
    Given that the user is on the <page> page
    And the "contact us" link will point to the following page: "https://onelogingovuk.service-now.com/csm?id=csm_sc_cat_item&sys_id=83902cb51b4822900a549978b04bcbed"

    Examples:
      | page                           |
      | "/documentation/user-journeys" |
