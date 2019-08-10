// https://docs.cypress.io/api/introduction/api.html

describe('Homepage', () => {
  beforeEach(function () {
    cy.visit('/');
  });

  it('Visits the app root url', () => {
    cy.contains('[data-text=welcome]', 'Hello')
  });

  it('displays the main app after clicking the home button', () => {
    cy.get('[data-form=checkin]').should('not.exist');
    cy.get('[data-list=customers]').should('not.exist');
    cy.get('[data-button=welcome]').click();
    cy.get('[data-form=checkin]').should('exist');
    cy.get('[data-list=customers]').should('exist');
  });
});
