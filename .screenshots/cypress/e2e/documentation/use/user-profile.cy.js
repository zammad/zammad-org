describe('user profile screenshot', () => {
  it('full page screenshot', () => {
    cy.env(['ADMIN_LOGIN', 'ADMIN_PASS']).then(({ ADMIN_LOGIN, ADMIN_PASS }) => {
      cy.loginDesktopView(ADMIN_LOGIN, ADMIN_PASS)
    })
    cy.visit('/desktop/personal-setting/appearance')
    cy.get('main').should('exist')
    cy.wait(1000)
    cy.screenshot('user-profile-settings-full')
  })

  it('avatar menu', () => {
    cy.env(['AGENT1_LOGIN', 'AGENT1_PASS']).then(({ AGENT1_LOGIN, AGENT1_PASS }) => {
      cy.loginDesktopView(AGENT1_LOGIN, AGENT1_PASS)
    })
    cy.get('button#user-menu').click()
    cy.wait(500)
    cy.get('[id="user-menu-popover"]').should('be.visible').clip({ padding: 5 }).then((PopoverClip) => {
      cy.get('button#user-menu').should('be.visible').clip({ padding: 5 }).then((AvatarClip) => {
        cy.mergeClips(PopoverClip, AvatarClip).then((mergedClip) => {
          cy.get('[aria-label="New ticket"]').should('be.visible').clip({ padding: 5 }).then((NewTicketClip) => {
            cy.mergeClips(mergedClip, NewTicketClip).then((clip) => {
              cy.screenshot('avatar-menu', { clip })
            })
          })
        })
      })
    })
  })

  it('token creation', () => {
    cy.env(['ADMIN_LOGIN', 'ADMIN_PASS']).then(({ ADMIN_LOGIN, ADMIN_PASS }) => {
      cy.loginDesktopView(ADMIN_LOGIN, ADMIN_PASS)
    })
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
      cy.get('button').contains('Copy token').clip({ padding: 25 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('token-dialog', { clip })
        })
      })
    })
  })
})
