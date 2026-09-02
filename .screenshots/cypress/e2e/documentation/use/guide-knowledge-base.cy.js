describe('knowledge base screenshots', () => {
  beforeEach(() => {
    cy.loginAs('ADMIN')
  })

  it('knowledge base full page', () => {
    // Click the KB entry in the primary navigation...
    cy.get('#primary-sidebar').contains('Knowledge Base').should('be.visible').click()
    // ... and wait for the KB route (not just any `main` — the shell keeps
    // the previous screen mounted during the transition).
    cy.url({ timeout: 15000 }).should('include', '/desktop/knowledge-base')
    // Wait until the category names are rendered: the main area mounts
    // empty first, then the category list loads ("Getting started",
    // "Products and orders", ...). Match the real card content.
    cy.contains('main', 'Getting started', { timeout: 20000 }).should('be.visible')
    cy.contains('main', 'Products and orders', { timeout: 20000 }).should('be.visible')
    // No skeleton placeholders left anywhere in the main area.
    cy.get('main [aria-busy="true"]', { timeout: 15000 }).should('not.exist')
    cy.screenshot('knowledge-base-full')
  })
})
