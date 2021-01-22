import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Place e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/api/places*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('place');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load Places', () => {
    cy.intercept('GET', '/api/places*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('place');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('Place').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details Place page', () => {
    cy.intercept('GET', '/api/places*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('place');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('place');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create Place page', () => {
    cy.intercept('GET', '/api/places*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('place');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Place');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit Place page', () => {
    cy.intercept('GET', '/api/places*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('place');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('Place');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should create an instance of Place', () => {
    cy.intercept('GET', '/api/places*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('place');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Place');

    cy.get(`[data-cy="name"]`).type('primary Loan', { force: true }).invoke('val').should('match', new RegExp('primary Loan'));

    cy.get(`[data-cy="numberOfSeats"]`).type('59067').should('have.value', '59067');

    cy.get(`[data-cy="shortName"]`)
      .type('regional Knoll innovative', { force: true })
      .invoke('val')
      .should('match', new RegExp('regional Knoll innovative'));

    cy.get(`[data-cy="colorBackground"]`).type('Games', { force: true }).invoke('val').should('match', new RegExp('Games'));

    cy.get(`[data-cy="colorText"]`)
      .type('Incredible Assurance Refined', { force: true })
      .invoke('val')
      .should('match', new RegExp('Incredible Assurance Refined'));

    cy.get(`[data-cy="description"]`)
      .type('../fake-data/blob/hipster.txt', { force: true })
      .invoke('val')
      .should('match', new RegExp('../fake-data/blob/hipster.txt'));

    cy.setFieldSelectToLastOfEntity('preferredDivision');

    cy.setFieldSelectToLastOfEntity('owner');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/api/places*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('place');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });

  it('should delete last instance of Place', () => {
    cy.intercept('GET', '/api/places*').as('entitiesRequest');
    cy.intercept('DELETE', '/api/places/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('place');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('place').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/api/places*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('place');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
});
