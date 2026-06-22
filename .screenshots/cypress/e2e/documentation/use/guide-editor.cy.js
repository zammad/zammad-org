describe('editor', () => {
  it('editor overview', () => {
    cy.visit('/desktop/login')
    cy.env(['ADMIN_LOGIN', 'ADMIN_PASS']).then(({ ADMIN_LOGIN, ADMIN_PASS }) => {
      cy.loginDesktopView(ADMIN_LOGIN, ADMIN_PASS)
    })
    cy.visit('/desktop/tickets/5')
    cy.get('main').should('exist')
    cy.wait(1000)
    cy.get('button').contains('Reply').click().wait(1000)
    cy.get('[data-type="editor"]').click().wait(500).type('Thank you for contacting us regarding the issue you\'re experiencing with your CPU ')
    cy.get('button[aria-label="Format as bold"]').click().wait(300)
    cy.get('[data-type="editor"]').type('XYZ9999 Ultimate.').wait(1000)
    cy.get('[data-type="editor"]').screenshot('editor-overview', { padding: 10 })
    cy.get('button').contains('Discard your unsaved changes').click()
    cy.get('button').contains('Discard changes').click()
  })
})
