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
    cy.get('.cursor-text.text-base').should('exist').click().wait(500).type('Thank you for contacting us regarding the issue you\'re experiencing with your CPU ')
    cy.get('button[aria-label="Format as bold"]').click().wait(300)
    cy.get('.cursor-text.text-base').should('exist').type('XYZ9999 Ultimate.').wait(1000)
    cy.get('.cursor-text.text-base').should('exist').screenshot('editor-overview', { padding: 10 })
    cy.get('button').contains('Discard your unsaved changes').click()
    cy.get('button').contains('Discard changes').click()
  })
})
