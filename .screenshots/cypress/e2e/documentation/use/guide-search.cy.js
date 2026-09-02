describe('search screenshots', () => {
  beforeEach(() => {
    cy.loginAs('ADMIN')
  })

  it('search', () => {
    cy.visit('/desktop/tickets/1')
    cy.get('main').should('exist')
    cy.get('[aria-label="Search…"]').should('be.visible').click()
    // Type the query and wait for the real dropdown content.
    cy.get('[aria-label="Search…"]').type('hannah')
    cy.get('[id="Organization-2"]', { timeout: 60000 }).should('be.visible')
    cy.get('header').clip().then((TopClip) => {
      cy.get('[id="Organization-2"]').clip({ padding: 5 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('search-sidebar', { clip })
        })
      })
    })
  })

  it('detailed search', () => {
    cy.visit('desktop/search/supp?entity=Ticket&filter.0.name=ticket.state_id&filter.0.operator=is&filter.0.value[0]=5&filter.0.value[1]=1&filter.0.value[2]=2&filter.1.name=ticket.last_contact_agent_at&filter.1.operator=within+last+(relative)&filter.1.value=7&filter.1.range=day')
    cy.get('label').contains('State').should('be.visible')
    cy.get('[aria-label="Laptop not working [Order 931529477]"]', { timeout: 10000 }).should('be.visible')
    cy.get('[aria-label="Breadcrumb navigation"]').clip({ padding: 10 }).then((TopClip) => {
      cy.get('table').clip({ padding: 10 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('search-detail', { clip })
        })
      })
    })
  })
})
