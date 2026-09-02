describe('user profile screenshot', () => {
  beforeEach(() => {
    cy.loginAs('ADMIN')
  })

  it('full page screenshot', () => {
    cy.visit('/desktop/tickets/3')
    cy.get('main').should('exist')
    cy.get('#ticketSidebar').should('be.visible', { timeout: 15000 }).click()
    // The side panel has rendered its content: wait for the actual attribute
    // fields (group, owner, state, priority), not just any <h2>.
    cy.get('#ticketSidebar').contains('Group', { timeout: 15000 }).should('be.visible')
    cy.get('#ticketSidebar').contains('Owner', { timeout: 15000 }).should('be.visible')
    cy.get('#ticketSidebar').contains('State', { timeout: 15000 }).should('be.visible')
    cy.get('#ticketSidebar').contains('Priority', { timeout: 15000 }).should('be.visible')
    // No skeleton placeholders left in the sidebar or article area.
    cy.get('#ticketSidebar [aria-busy="true"]', { timeout: 15000 }).should('not.exist')
    cy.get('main [aria-busy="true"]', { timeout: 15000 }).should('not.exist')
    cy.screenshot('zammad-ui-full')
  })
})
