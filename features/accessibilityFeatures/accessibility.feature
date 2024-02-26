Feature: All product pages must meet the accessibility standards

  Below page names have added for reference to relevant page
  @accessible
  Scenario Outline: user validating the accessibility of product pages
    Given that the user is on the '<url>' page
    Then there should be no accessibility violations

    Examples:

      | pageName                                                                     | url                                                      |
      | Homepage                                                                     | /                                                        |
      | About Welcome to GOV.UK  One Login (parent)                                  | /about                                                   |
      | signing-users-in                                                             | /about/signing-users-in                                  |
      | Checking users identities                                                    | /about/checking-users-identities                         |
      | How users can prove their identity                                           | /about/checking-users-identities/evidence-types          |
      | The signed in experience                                                     | /about/signed-in-experience                              |
      | Roadmap                                                                      | /about/roadmap                                           |
      | Technical documentation                                                      | /documentation                                           |
      | Sign in user journey maps                                                    | /documentation/user-journeys                             |
      | Proving identity journey maps                                                | /documentation/identity-journeys                         |
      | Design recommendations (parent)                                              | /documentation/design-recommendations                    |
      | Let users create a Welcome to GOV.UK  One Login to save progress             | /documentation/design-recommendations/save-progress      |
      | Let users navigate to their Welcome to GOV.UK  One Login and sign out easily | /documentation/design-recommendations/save-progress      |
      | Show users where to change their Welcome to GOV.UK   One Login credentials   | /documentation/design-recommendations/change-credentials |
      | Get started with Welcome to GOV.UK  One Login                                | https://www.sign-in.service.gov.uk/getting-started       |
      | Support                                                                      | /support                                                 |
      | Contact us (get started)                                                     | /contact-us-details                                      |
      | Contact us form                                                              | /contact-us                                              |
      | Accessibility                                                                | /accessibility                                           |
      | Privacy                                                                      | privacy-policy                                           |
      | Cookies                                                                      | /cookies                                                 |
      | Register to get started with GOV.UK One Login                                | /register                                                |
      | Contact us                                                                   | /contact-us                                              |
