describe('editor', () => {
  beforeEach(() => {
    cy.loginAs('ADMIN')
  })

  it('editor overview', () => {
    cy.visit('/desktop/tickets/7')
    cy.get('main').should('exist')
    cy.wait(3000) // settle the ticket view
    cy.touchDeviceEmulation(true) // fix for not being able to click the "reply" button directly
    cy.get('[aria-label="Action menu button"]').first().click()
    cy.wait(500)
    cy.get('button').contains('Reply').click()
    cy.wait(1500)
    cy.get('[role="textbox"]', { timeout: 10000 }).should('be.visible')
    cy.get('[role="textbox"]').click()
    cy.get('[role="textbox"]').type('Thank you for contacting us regarding the issue you\'re experiencing with your CPU ')
    cy.get('button[aria-label="Format as bold"]').should('be.visible').click()
    // The ProseMirror editor can re-render after the bold click gives it time to
    // settle before we type the next chunk — without this, `.type()` can
    // race against the re-rendered (or briefly-removed) editor node.
    cy.get('[role="textbox"]').should('exist', { timeout: 5000 })
    cy.get('[role="textbox"]').type('XYZ9999 Ultimate.')
    // The bolded word should be in the DOM before the screenshot.
    cy.contains('XYZ9999 Ultimate.').should('exist')
    cy.touchDeviceEmulation(false)
    cy.get('[id="ticketArticleReplyForm"]').screenshot('editor-overview', { padding: 10 })
    // Clean up so we don't leak a draft into the next specs.
    cy.get('button').contains('Discard your unsaved changes').should('be.visible').click()
    cy.get('button').contains('Discard changes').should('be.visible').click()
  })
})
