describe('overview screenshots', () => {
      it('overview full page', () => {
      cy.visit('/desktop/login')
      cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
      cy.visit('/desktop/tickets/view/open-group')
      //cy.wait(3000)
      cy.get('table').should('exist')
      cy.screenshot('overview-full')
      }),

      it('overview detail', () => {
      cy.visit('/desktop/login')
      cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
      cy.visit('/desktop/tickets/view/open-group')
      cy.wait(3000)
      //cy.get('data-v-cbc8c800').should('exist')
      cy.get('div.grow').should('exist').screenshot('overview-detail')
      })
})