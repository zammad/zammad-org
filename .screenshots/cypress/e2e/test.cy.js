describe('testing screenshots', () => {
  it('full page screenshot', () => {
    cy.visit('/desktop/login')

    cy.get('main').should('exist')

    cy.screenshot('test-screenshot-full-page')
  })

  it('page element screenshot', () => {
    cy.visit('/desktop/login')

    cy.get('main').screenshot('test-screenshot-page-element', {
      blackout: [
        'h1', // redact heading
      ],
    })
  })
})