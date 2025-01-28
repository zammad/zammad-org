describe('usage advanced features', () => {
  it('ticket article mention', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/7')
    cy.wait(1000) // transition
    cy.get('button').contains('note').click()
    cy.wait(500) // transition
    cy.get('label').contains('Text').click().type('Hello @@et')
    cy.wait(500)
    cy.get('#ticketArticleReplyForm').screenshot('ticket-article-mention', { padding: [10, 0, 0, 0] })
    cy.get('button').contains('Discard your unsaved changes').click()
    cy.get('button').contains('Discard Changes').click()
  })

  it('ticket article text template', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/7')
    cy.wait(1000) // transition
    cy.get('button').contains('note').click()
    cy.wait(500) // transition
    cy.get('label').contains('Text').click().type('::mr')
    cy.wait(500)
    cy.get('#ticketArticleReplyForm').screenshot('ticket-article-text-template', { padding: [10, 0, 0, 0] })
    cy.get('button').contains('Discard your unsaved changes').click()
    cy.get('button').contains('Discard Changes').click()
  })

  it('ticket subscribe', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/7')
    cy.wait(1000) // transition
    cy.get('#ticket-attributes-header').click()
    cy.wait(300)
    cy.get('label').contains('Subscribe me').click()
    cy.wait(1000) // transition
    cy.get('#ticket-subscribers').parent().screenshot('ticket-subscribe', { padding: 5 })
    cy.get('label').contains('Subscribe me').click()
  })

  it('ticket macro', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/7')
    cy.wait(3000) // loading
    cy.get('[aria-label="Additional ticket edit actions"]').click()
    cy.wait(500) //transition
    cy.get('[id^=popover-]').clip({ padding: 5 }).then((PopoverClip) => {
      cy.get('footer').find('[id^=action-menu-]').clip({ padding: 5 }).then((ButtonClip) => {
        cy.mergeClips(PopoverClip, ButtonClip).then((clip) => {
          cy.screenshot('ticket-macro', { clip })
        })
      })
    })
  })

  it('ticket behavior update', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/7')
    cy.wait(3000) // loading
    cy.get('button').contains('Stay on tab').click()
    cy.wait(500) //transition
    cy.get('div.popover.fixed.z-50.flex').clip({ padding: 5 }).then((PopoverClip) => {
      cy.get('button').contains('Stay on tab').parent().clip({ padding: 5 }).then((ButtonClip) => {
        cy.mergeClips(PopoverClip, ButtonClip).then((clip) => {
          cy.screenshot('ticket-behavior-update', { clip })
        })
      })
    })
  })

  it('ticket tags', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/6')
    cy.wait(3000) // transition
    cy.get('[aria-label="Remove this tag"').first().invoke('show') //should show a delete button but doesn't work; also not for "trigger.('mouseover')"
    cy.get('#ticket-tags').parent().screenshot('ticket-tags', { padding: 5 })
  })

  it('ticket checklist', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/4')
    cy.wait(2000) // transition
    cy.get('[aria-label="Checklist"').click()
    cy.wait(1000) // transition
    // cy.get('#ticketSidebar').screenshot('ticket-checklist') alternative with complete sidebar
    cy.get('#checklistTitle').parent().clip({ padding: 5 }).then((TopClip) => {
      cy.get('[aria-label="Create a new checklist item"]').clip({ padding: 5 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('ticket-checklist', { clip })
        })
      })
    })
  })

  it('ticket merge', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/5')
    cy.wait(1000) // transition
    cy.get('#content-sidebar').find('[id^=action-menu-]').click()
    cy.wait(300) // transition
    cy.get('button').contains('Merge').click()
    cy.wait(3000) // waiting on ticket to show up in side panel
    //cy.get('[id=flyout-ticket-merge]').screenshot('ticket-merge') //alternative with complete sidebar
    cy.get('[id="flyout-ticket-merge"]').find('header').clip().then((TopClip) => {
      cy.get('table').clip().then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('ticket-merge', { clip })
        })
      })
    })
  })

  it('ticket split', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/5')
    cy.wait(2000) // transition
    cy.get('main').find('[id^=action-menu-]').click()
    cy.wait(300) // transition
    // cy.get('#icon-split').trigger('mouseover') doesn't work
    cy.get('[id^="popover-"]').screenshot('ticket-split')
  })
})