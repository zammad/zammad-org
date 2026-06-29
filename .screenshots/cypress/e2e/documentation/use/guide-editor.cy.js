describe('editor', () => {
  it('editor overview', () => {
    cy.visit('/desktop/login')
    cy.env(['ADMIN_LOGIN', 'ADMIN_PASS']).then(({ ADMIN_LOGIN, ADMIN_PASS }) => {
      cy.loginDesktopView(ADMIN_LOGIN, ADMIN_PASS)
    })
    cy.visit('/desktop/tickets/5')
    cy.get('main').should('exist')
    cy.wait(3000)
    cy.touchDeviceEmulation(true) // fix for not being able to click the "reply" button directly
    cy.get('[aria-label="Action menu button"]').first().click()
    cy.wait(500)
    cy.get('button').contains('Reply').click().wait(1500)
    cy.touchDeviceEmulation(false)
    cy.get('[role="textbox"]').should('be.visible').click().type('Thank you for contacting us regarding the issue you\'re experiencing with your CPU ')
    cy.wait(500)
    cy.get('button[aria-label="Format as bold"]').click().wait(300)
    cy.get('[role="textbox"]').should('be.visible').type('XYZ9999 Ultimate.').wait(1000)
    cy.get('[role="textbox"]').should('be.visible').screenshot('editor-overview', { padding: 10 })
    cy.get('button').contains('Discard your unsaved changes').click()
    cy.get('button').contains('Discard changes').click()
  })
})
