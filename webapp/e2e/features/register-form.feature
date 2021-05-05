Feature: Login with registered user

Scenario: The user is registered with inrupt
  Given A registered user
  When I fill the webid in the form and press login
  Then The welcome view is shown