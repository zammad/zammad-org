describe('testing dialog screenshots', () => {
  it('discarding unsaved article changes', () => {
    cy.loginDesktopView(Cypress.env('AGENT1_LOGIN'), Cypress.env('AGENT1_PASS'))
    cy.intercept('/graphql').as('gql')
    cy.visit('/desktop/tickets/1')
    cy.waitForGqlResponse('@gql', 'macros')
    cy.get('button').contains('Add reply').click()
    cy.get('button').contains('Discard your unsaved changes').click()
    cy.wait(300) // transition
    cy.get('[role="dialog"]').screenshot('test-discarding-unsaved-article-changes')
    cy.get('button').contains('Discard Changes').click()
    cy.closeTab('Welcome to Zammad!')
  })
})