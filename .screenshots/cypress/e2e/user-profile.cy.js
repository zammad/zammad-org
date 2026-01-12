describe('user profile screenshot', () => {
  it('full page screenshot', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/personal-setting/appearance')
    cy.get('main').should('exist')
    cy.wait(1000)
    cy.screenshot('user-profile-settings-full')
  })

  it('avatar menu screenshot', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.get('button#user-menu').click()
    cy.get('#user-menu-popover').should('exist').screenshot('user-menu-detail-panel')
  })

  it('token creation', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/personal-setting/token-access')
    cy.get('main').should('exist')
    cy.wait(1000)
    cy.get('button').contains('New personal access token').click().wait(1000)
    cy.get('label').contains('Name').click().type('App API token')
    cy.get('label').contains('Admin interface').click().wait(200)
    cy.get('label').contains('Profile settings').click().wait(200)
    cy.get('[aria-label="Toggle group"]').last().click().wait(200)
    cy.get('label').contains('Agent tickets').click().wait(200)
    cy.get('button').contains('Create').click().wait(300)
    cy.get('[id="flyout-new-access-token-title"]').clip({ padding: 10 }).then((TopClip) => {
      cy.get('button').contains('OK, I have copied my token').clip({ padding: 25 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('token-dialog', { clip })
      })
    })
  })
})
})