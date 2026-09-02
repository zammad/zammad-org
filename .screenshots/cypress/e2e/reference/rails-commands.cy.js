describe('Rails commands screenshots', () => {
  beforeEach(() => {
    cy.loginAs('ADMIN')
  })

  it('article creation note', () => {
    cy.visit('/desktop/tickets/5')
    cy.get('main').should('exist')
    cy.get('button').contains('Add internal note').should('be.visible').click()
    cy.get('[id="ticketArticleReplyForm"]', { timeout: 10000 }).should('be.visible')
    cy.get('[id^=internal-]').first().click()
    cy.get('[role="textbox"]').should('be.visible')
    cy.get('[role="textbox"]').type('This is an article text...')
    cy.get('[id="ticketArticleReplyForm"]').screenshot('article-creation-note', { padding: 5 })
    cy.get('button').contains('Discard your unsaved changes').should('be.visible').click()
    cy.get('button').contains('Discard changes').should('be.visible').click()
  })
})
