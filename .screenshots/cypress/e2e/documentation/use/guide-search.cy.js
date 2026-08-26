describe('search screenshots', () => {
  it('search', () => {
    cy.env(['ADMIN_LOGIN', 'ADMIN_PASS']).then(({ ADMIN_LOGIN, ADMIN_PASS }) => {
      cy.loginDesktopView(ADMIN_LOGIN, ADMIN_PASS)
    })
    cy.visit('/desktop/tickets/1')
    cy.wait(1000) // transition
    cy.get('[aria-label="Search…"]').click().type('hannah')
    cy.wait(2000) // transition
    cy.get('header').clip().then((TopClip) => {
      cy.get('[id="Organization-2"]', { timeout: 60000 }).clip({ padding: 5 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('search-sidebar', { clip })
        })
      })
    })
  })

  it('detailed search', () => {
    cy.env(['ADMIN_LOGIN', 'ADMIN_PASS']).then(({ ADMIN_LOGIN, ADMIN_PASS }) => {
      cy.loginDesktopView(ADMIN_LOGIN, ADMIN_PASS)
    })
    cy.visit('desktop/search/supp?entity=Ticket&filter.0.name=ticket.state_id&filter.0.operator=is&filter.0.value[0]=5&filter.0.value[1]=1&filter.0.value[2]=2&filter.1.name=ticket.last_contact_agent_at&filter.1.operator=within+last+(relative)&filter.1.value=7&filter.1.range=day')
    cy.wait(1000)
    cy.get('label').contains('State').should('be.visible')
    cy.get('[aria-label="Laptop not working [Order 931529477]"]').should('be.visible')
    cy.get('[aria-label="Breadcrumb navigation"]').clip({ padding: 10 }).then((TopClip) => {
      cy.get('table').clip({ padding: 10 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('search-detail', { clip })
          })
        })
      })
  })
})
