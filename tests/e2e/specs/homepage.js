// https://docs.cypress.io/api/introduction/api.html

describe('Homepage', () => {
  beforeEach(function () {
    cy.visit('/');
  });

  it('Visits the app root url', () => {
    cy.contains('h1', 'Hello')
  });

  it('displays the main app after clicking the home button', () => {
    cy.get('.gym-content-in-out').should('not.exist');
    cy.get('.gym-content-customers').should('not.exist');
    cy.get('.gym-welcome-button').click();
    cy.get('.gym-content-in-out').should('exist');
    cy.get('.gym-content-customers').should('exist');
  });
});
