describe('2FA usage guide', () => {
  it('2FA methods profile setup', () => {
    // Login happens before navigation so the 2FA settings page has a valid
    // session and the breadcrumb renders.
    cy.loginAs('ADMIN')
    cy.visit('/desktop/personal-setting/two-factor-auth')
    cy.get('main').should('exist')
    // The two-factor authentication table and its "key" entry are the last
    // thing to render — wait for the key row to be present.
    cy.get('[aria-label="Breadcrumb navigation"]').should('be.visible')
    cy.get('[aria-label="key"]').should('be.visible', { timeout: 10000 })
    cy.get('[aria-label="Breadcrumb navigation"]').clip({ padding: 10 }).then((TopClip) => {
      cy.get('[aria-label="key"]').parent().parent().clip({ padding: 10 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('2fa-methods-profile-setup', { clip })
        })
      })
    })
  })

  // NB: Will work up to 50 times per stack, because the recovery codes are one-time usage only.
  it('2FA methods profile overview', () => {
    // AGENT2 uses the one-time recovery code (consumes one per run).
    cy.loginAs('AGENT2', '7f80b91f6bcd7b60')
    cy.visit('/desktop/personal-setting/two-factor-auth')
    cy.get('main').should('exist')
    cy.get('button').contains('Regenerate recovery codes').should('be.visible', { timeout: 10000 })
    cy.get('[aria-label="Breadcrumb navigation"]').clip({ padding: 10 }).then((TopClip) => {
      cy.get('button').contains('Regenerate recovery codes').parent().parent().clip({ padding: 10 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('2fa-methods-profile-overview', { clip })
        })
      })
    })
    cy.get('[aria-label="Action menu button for authenticator app"]').should('be.visible').click()
    cy.get('div.popover.fixed').should('be.visible', { timeout: 10000 })
    cy.get('div.popover.fixed').clip({ padding: 10 }).then((PopoverClip) => {
      cy.get('[aria-label="Breadcrumb navigation"]').clip({ padding: 10 }).then((TopClip) => {
        cy.mergeClips(PopoverClip, TopClip).then((MiddleClip) => {
          cy.get('button').contains('Regenerate recovery codes').parent().parent().clip({ padding: 10 }).then((BottomClip) => {
            cy.mergeClips(MiddleClip, BottomClip).then((clip) => {
              cy.screenshot('2fa-methods-profile-action-menu', { clip })
            })
          })
        })
      })
    })
  })
})
