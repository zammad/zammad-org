describe('search screenshots', () => {
  it('search', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/1')
    cy.wait(1000) // transition
    cy.get('[aria-label="Search…"]').click().type('hannah')
    cy.wait(500) // transition
    cy.get('header').clip().then((TopClip) => {
    cy.get('[id="Organization-2"]').clip({ padding: 5 }).then((BottomClip) => {
      cy.mergeClips(TopClip, BottomClip).then((clip) => {
        cy.screenshot('search-sidebar', { clip })
        })
      })
    })
  })

  it('detailed search', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/search/supp?entity=Ticket')
    cy.get('[id="group_id-header"]').click()
    cy.wait(300) //transition
    cy.get('[aria-label="Breadcrumb navigation"]').clip({ padding: 5 }).then((TopClip) => {
    cy.get('table').clip({ padding: 5 }).then((BottomClip) => {
      cy.mergeClips(TopClip, BottomClip).then((clip) => {
        cy.screenshot('search-detail', { clip })
        })
      })
    })
  })
})