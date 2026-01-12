describe('2FA usage guide', () => {
  it('2FA methods profile setup', () => {
    cy.visit('/desktop/login')
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/personal-setting/two-factor-auth')
    cy.get('main').should('exist')
    cy.get('[aria-label="Breadcrumb navigation"]').clip({ padding: 5 }).then((TopClip) => {
      cy.get('[aria-label="key"]').parent().parent().clip({ padding: 5 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('2fa-methods-profile-setup', { clip })
        })
      })
    })
  })

  // NB: Will work only once per stack, because the recovery codes are one-time usage only.
  it('2FA methods profile overview', () => {
    cy.visit('/desktop/login')
    cy.loginDesktopView(Cypress.env('AGENT2_LOGIN'), Cypress.env('AGENT2_PASS'), '7f80b91f6bcd7b60')
    cy.visit('/desktop/personal-setting/two-factor-auth')
    cy.get('main').should('exist')
    cy.get('[aria-label="Breadcrumb navigation"]').clip({ padding: 5 }).then((TopClip) => {
      cy.get('button').contains('Regenerate recovery codes').parent().parent().clip({ padding: 5 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('2fa-methods-profile-overview', { clip })
        })
      })
    })
    cy.get('[aria-label="Action menu button for authenticator app"]').click()
    cy.wait(500) // transition
    cy.get('div.popover.fixed').clip({ padding: 5 }).then((PopoverClip) => {
      cy.get('[aria-label="Breadcrumb navigation"]').clip({ padding: 5 }).then((TopClip) => {
        cy.mergeClips(PopoverClip, TopClip).then((MiddleClip) => {
          cy.get('button').contains('Regenerate recovery codes').parent().parent().clip({ padding: 5 }).then((BottomClip) => {
            cy.mergeClips(MiddleClip, BottomClip).then((clip) => {
              cy.screenshot('2fa-methods-profile-action-menu', { clip })
            })
          })
        })
      })
    })
  })
})
