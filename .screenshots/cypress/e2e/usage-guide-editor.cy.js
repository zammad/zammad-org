describe('editor', () => {
  it('editor overview', () => {
    cy.visit('/desktop/login')
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/5')
    cy.get('main').should('exist')
    cy.wait(1000)
    cy.get('button').contains('Add reply').click().wait(500)
    cy.get('[data-type="editor"]').click().wait(500).type('Thank you for contacting us regarding the issue you\'re experiencing with your CPU {ctrl+b}XYZ9999 Ultimate.')
    cy.get('[data-type="editor"]').screenshot('editor-overview', { padding: 10 })
    cy.get('button').contains('Discard your unsaved changes').click()
    cy.get('button').contains('Discard Changes').click()
    })
  })

