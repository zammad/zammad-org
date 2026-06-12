describe('ticket sidebar', () => {
  it('ticket sidebar', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/6')
    cy.get('main').should('exist')
    cy.wait(2000)
    cy.get('[aria-label="Ticket"]').clip({ padding: 10 }).then((TopClip) => {
      cy.get('[id="ticket-subscribers"]').clip({ padding: 10 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('ticket-sidebar', { clip })
        })
      })
    })
  })

  it('ticket create', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/create')
    cy.get('main').should('exist')
    cy.wait(2000)
    cy.get('[aria-label="New ticket"]').highlight()
    cy.get('[id="ticket-create"]').highlight()
    cy.screenshot('ticket-create')
  })

  it('article type visibility', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/6')
    cy.get('main').should('exist')
    cy.wait(2000)
    cy.get('button').contains('Add internal note').click()
    cy.wait(1000)
    cy.get('[id="ticketArticleReplyForm"]').screenshot('article-type-visibility')
    cy.get('button').contains('Discard your unsaved changes').click()
    cy.get('button').contains('Discard changes').click()
  })

 it('new article', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/6')
    cy.get('main').should('exist')
    cy.wait(2000)
    cy.get('button').contains('Add internal note').parent().clip({ padding: 5 }).then((TopClip) => {
      cy.get('span').contains('or use the reply actions on articles.').parent().clip({ padding: 5 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('new-article', { clip })
        })
      })
    })
  })

 it('article reply', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/4')
    cy.get('main').should('exist')
    cy.wait(2000)
    cy.touchDeviceEmulation(true) // enable touch emulation temporarily to show the reply and reply all actions
    cy.get('[aria-label="Action menu button"]').first().click()
    cy.get('[aria-label="Action menu button"]').first().parent().parent().highlight()
    cy.get('[data-test-id="article-bubble-container-8"]').clip({ padding: 5 }).then((TopClip) => {
      cy.get('[role="menu"]').last().clip({ padding: 5 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('article-reply', { clip })
        })
      })
    })
    cy.touchDeviceEmulation(false) // disable touch emulation again
  })

  it('copy ticket number button', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/4')
    cy.get('main').should('exist')
    cy.wait(2000)
    cy.get('[aria-label="Copy ticket number"]').highlight()
    cy.get('[aria-label="Breadcrumb navigation"]').clip({ padding: 10 }).then((TopClip) => {
      cy.get('[aria-label="Open checklist"]').clip({ padding: 10 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('copy-ticket-number-button', { clip })
        })
      })
    })
  })

})
