describe('user profile screenshot', () => {
  it('full page screenshot', () => {
    cy.visit('/desktop/login')
    cy.env(['ADMIN_LOGIN', 'ADMIN_PASS']).then(({ ADMIN_LOGIN, ADMIN_PASS }) => {
      cy.loginDesktopView(ADMIN_LOGIN, ADMIN_PASS)
    })
    cy.visit('/desktop/tickets/3')
    cy.get('main').should('exist')
    cy.get('#ticketSidebar').click()
    cy.wait(3000)
    cy.screenshot('zammad-ui-full')
  })
})
