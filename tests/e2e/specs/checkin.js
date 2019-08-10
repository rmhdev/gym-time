// https://docs.cypress.io/api/introduction/api.html

describe('Checkin', () => {
  beforeEach(function () {
    cy.visit('/');
    cy.get('[data-button=welcome]').click();
  });

  it('Checkin a new customer', () => {
    cy.get('[data-list=customers]').find('[data-item=customer]').should('have.length', 0);

    cy.get('[data-form=checkin]').find('[data-field=name]').type('Customer One');
    cy.get('[data-form=checkin]').find('[data-button=save]').click();

    cy.get('[data-list=customers]').find('[data-item=customer]').should('have.length', 1);
    cy
        .get('[data-list=customers]')
        .find('[data-item=customer]')
        .first()
        .should('have.attr', 'data-name')
        .and('include', 'Customer One');
  });
});
