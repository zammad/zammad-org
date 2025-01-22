describe('user profile screenshot', () => {
      it('full page screenshot', () => {
      cy.visit('/desktop/login')
      cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
      cy.visit('/desktop/tickets/3')
      cy.get('main').should('exist')
      cy.get('#ticketSidebar').click()
      cy.wait(3000)
      cy.screenshot('zammad-ui-full')
      })
    })