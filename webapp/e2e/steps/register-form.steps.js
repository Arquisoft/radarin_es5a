const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./features/register-form.feature');

defineFeature(feature, test => {
  
  beforeEach(async () => {
    await global.page.goto('http://localhost:3000')
  })

  test('The user is registered with inrupt', ({given,when,then}) => {
    
    let webIdJoaquinRad;

    given('A registered user', () => {
      webIdJoaquinRad = "https://joaquinrad.inrupt.net/profile/card#me"
    });

    when('I fill the webid in the form and press login', async () => {
      await expect(page).toFillForm('form', {
        idp: webIdJoaquinRad,
      })
      await expect(page).toClick('button', { text: 'Login' })
      await expect(page).toMatch('Welcome')
    });

    then('The welcome view is shown', async () => {
    });
  });
});