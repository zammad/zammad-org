describe('2FA user setup', () => {
    it('2FA methods profile', () => {
      cy.visit('/desktop/login')
      cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
      cy.visit('/desktop/personal-setting/two-factor-auth')
      cy.get('main').should('exist')
      cy.get('[aria-label="Breadcrumb navigation"]').clip({ padding: 5 }).then((TopClip) => {
        cy.get('[aria-label="key"]').parent().parent().clip({ padding: 5 }).then((BottomClip) => {
          cy.mergeClips(TopClip, BottomClip).then((clip) => {
            cy.screenshot('2FA-methods-profile', { clip })
          })
        })
      })
    })
})