describe('user profile screenshot', () => {
  it('full page screenshot', () => {
    cy.visit('/desktop/login')
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/personal-setting/appearance')
    cy.get('main').should('exist')
    cy.wait(1000)
    cy.screenshot('user-profile-settings-full')
  })

  it('avatar menu screenshot', () => {
    cy.visit('/desktop/login')
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.get('button#user-menu').click()
    cy.get('#user-menu-popover').should('exist').screenshot('user-menu-popover')
  })
  })