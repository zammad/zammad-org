describe('user profile screenshot', () => {
  beforeEach(() => {
    cy.loginAs('ADMIN')
  })

  it('full page screenshot', () => {
    cy.visit('/desktop/personal-setting/appearance')
    cy.get('main').should('exist')
    // Wait until the settings form has rendered its sections.
    cy.contains('Appearance', { timeout: 10000 }).should('be.visible')
    cy.screenshot('user-profile-settings-full')
  })

  it('avatar menu', () => {
    cy.loginAs('AGENT1')
    cy.get('button#user-menu').should('be.visible').click()
    cy.get('[id="user-menu-popover"]').should('be.visible', { timeout: 10000 })
    cy.get('[aria-label="New ticket"]').should('be.visible')
    cy.get('[id="user-menu-popover"]').clip({ padding: 5 }).then((PopoverClip) => {
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
    cy.visit('/desktop/personal-setting/token-access')
    cy.get('main').should('exist')
    cy.get('button').contains('New personal access token').should('be.visible').click()
    cy.get('[id="flyout-new-access-token-title"]').should('be.visible', { timeout: 10000 })
    cy.get('label').contains('Name').click().type('App API token')
    cy.get('label').contains('Admin interface').click()
    cy.get('label').contains('Profile settings').click()
    cy.get('[aria-label="Toggle group"]').last().click()
    cy.get('label').contains('Agent tickets').click()
    cy.get('button').contains('Create').click()
    // The dialog with the token and the Copy button is the end state.
    cy.get('button').contains('Copy token').should('be.visible', { timeout: 10000 }).click()
    cy.get('[id="flyout-new-access-token-title"]').clip({ padding: 10 }).then((TopClip) => {
      cy.get('button').contains('Copy token').clip({ padding: 25 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('token-dialog', { clip })
        })
      })
    })
    // Cleanup: try to delete the token so repeated runs don't accumulate
    // tokens in the profile (also removes tokens left by older runs of this
    // spec). NB: this only runs when everything above succeeded — if an
    // assertion fails, Cypress aborts the test before reaching it.
    //
    // NB: the delete currently fails with "The personal access token could
    // not be deleted." — an upstream Zammad issue: the GraphQL authorization
    // wraps the current user in a UserContext delegator, and TokenPolicy's
    // `record.user == user` comparison never matches against it, so the
    // mutation is rejected with Exceptions::Forbidden. Until that is fixed,
    // the assertion below is limited to the dialog flow; the token stays.
    cy.contains('OK, I have copied my token').click()
    // Delete every remaining 'App API token' row. Rows carry a stable
    // data-item-id (gid://zammad/Token/<n>); snapshot the ids up front and
    // target each row by id so a failed deletion advances to the next row
    // instead of retrying .first() on an unchanged table.
    cy.get('table tbody tr').then(($rows) => {
      const ids = Cypress.$.makeArray($rows)
        .filter((tr) => tr.innerText.includes('App API token'))
        .map((tr) => tr.getAttribute('data-item-id'))
      cy.wrap(ids).each((id) => {
        // Synchronize on the delete mutation instead of a fixed wait; the
        // request completes either way (see upstream note above), so the
        // alias resolves for both outcomes.
        cy.intercept('POST', '**/graphql', (req) => {
          const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body)
          if (body.includes('userCurrentAccessTokenDelete')) req.alias = 'tokenDelete'
        })
        cy.get(`tr[data-item-id="${id}"]`)
          .find('button[aria-label="Delete this access token"]')
          .click()
        cy.contains('button', 'Delete object').should('be.visible').click()
        cy.wait('@tokenDelete')
      })
    })
  })
})
