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

describe('Division e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/api/divisions*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('division');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load Divisions', () => {
    cy.intercept('GET', '/api/divisions*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('division');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('Division').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details Division page', () => {
    cy.intercept('GET', '/api/divisions*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('division');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('division');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create Division page', () => {
    cy.intercept('GET', '/api/divisions*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('division');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Division');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit Division page', () => {
    cy.intercept('GET', '/api/divisions*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('division');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('Division');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should create an instance of Division', () => {
    cy.intercept('GET', '/api/divisions*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('division');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Division');

    cy.get(`[data-cy="name"]`)
      .type('North Viaduct Infrastructure', { force: true })
      .invoke('val')
      .should('match', new RegExp('North Viaduct Infrastructure'));

    cy.get(`[data-cy="shortName"]`)
      .type('non-volatile policy Cambridgeshire', { force: true })
      .invoke('val')
      .should('match', new RegExp('non-volatile policy Cambridgeshire'));

    cy.get(`[data-cy="numberOfPeople"]`).type('65655').should('have.value', '65655');

    cy.get(`[data-cy="divisionType"]`).select('SCHOOL');

    cy.get(`[data-cy="colorBackground"]`).type('orchid', { force: true }).invoke('val').should('match', new RegExp('orchid'));

    cy.get(`[data-cy="colorText"]`).type('ivory', { force: true }).invoke('val').should('match', new RegExp('ivory'));

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/api/divisions*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('division');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });

  it('should delete last instance of Division', () => {
    cy.intercept('GET', '/api/divisions*').as('entitiesRequest');
    cy.intercept('DELETE', '/api/divisions/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('division');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('division').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/api/divisions*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('division');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
});
