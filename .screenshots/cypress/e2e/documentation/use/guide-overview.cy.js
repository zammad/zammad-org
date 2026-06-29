describe('overview screenshots', () => {
  it('overview full page', () => {
    cy.visit('/desktop/login')
    cy.env(['ADMIN_LOGIN', 'ADMIN_PASS']).then(({ ADMIN_LOGIN, ADMIN_PASS }) => {
      cy.loginDesktopView(ADMIN_LOGIN, ADMIN_PASS)
    })
    cy.visit('/desktop/tickets/view/open-group')
    cy.wait(3000)
    cy.get('table').should('exist')
    cy.screenshot('overview-full')
  })
})
