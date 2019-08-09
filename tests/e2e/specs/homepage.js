// https://docs.cypress.io/api/introduction/api.html

describe('Homepage', () => {
  beforeEach(function () {
    cy.visit('/');
  });

  it('Visits the app root url', () => {
    cy.contains('h1', 'Hello')
  });

  it('Allows accessing the app', () => {
    cy.get('.gym-welcome-button').click();
    cy.contains('.gym-content');

    //     .then(function () {
    //
    // })
  });
});
