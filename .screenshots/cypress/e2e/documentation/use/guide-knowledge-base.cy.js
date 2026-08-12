describe('knowledge base screenshots', () => {
  it('knowledge base full page', () => {
    cy.env(['ADMIN_LOGIN', 'ADMIN_PASS']).then(({ ADMIN_LOGIN, ADMIN_PASS }) => {
      cy.loginDesktopView(ADMIN_LOGIN, ADMIN_PASS)
    })
    cy.get('#primary-sidebar').contains('Knowledge Base').click()
    cy.wait(3000) // transition and content loading
    cy.get('main').should('exist')
    cy.screenshot('knowledge-base-full')
  })
})
