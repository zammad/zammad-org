describe('usage advanced features', () => {
  it('ticket article mention', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/7')
    cy.wait(1000) // transition
    cy.get('button').contains('note').click()
    cy.wait(500) // transition
    cy.get('label').contains('Text').click().type('Hello @@et')
    cy.wait(1000)
    cy.get('[aria-label="Mention user"]').highlight()
    cy.get('#ticketArticleReplyForm').screenshot('ticket-article-mention', { padding: [10, 0, 0, 0] })
    cy.get('button').contains('Discard your unsaved changes').click()
    cy.get('button').contains('Discard changes').click()
  })

  it('ticket article kba', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/7')
    cy.wait(1000) // transition
    cy.get('button').contains('note').click()
    cy.wait(500) // transition
    cy.get('label').contains('Text').click().type('??')
    cy.wait(1000)
    cy.get('[aria-label="Insert text from knowledge base answer"]').highlight()
    cy.get('#ticketArticleReplyForm').screenshot('ticket-article-insert-kba', { padding: [10, 0, 0, 0] })
    cy.get('button').contains('Discard your unsaved changes').click()
    cy.get('button').contains('Discard changes').click()
  })

  it('ticket article text template', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/7')
    cy.wait(1000) // transition
    cy.get('button').contains('note').click()
    cy.wait(500) // transition
    cy.get('label').contains('Text').click().type('::mr')
    cy.wait(1000)
    cy.get('[aria-label="Insert text from text module"]').highlight()
    cy.get('#ticketArticleReplyForm').screenshot('ticket-article-text-template', { padding: [10, 0, 0, 0] })
    cy.get('button').contains('Discard your unsaved changes').click()
    cy.get('button').contains('Discard changes').click()
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
    cy.get('[aria-label="Drafts & macros"]').click()
    cy.wait(500) //transition
    cy.get('div.popover.fixed').clip({ padding: 5 }).then((PopoverClip) => {
      cy.get('[aria-label="Drafts & macros"]').clip({ padding: 5 }).then((ButtonClip) => {
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
    cy.get('div.popover.fixed').clip({ padding: 5 }).then((PopoverClip) => {
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

  it('time accounting', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/7')
    cy.wait(1000) // transition
    cy.get('button').contains('note').click()
    cy.wait(500) // transition
    cy.get('label').contains('Text').click().type('test')
    cy.wait(500)
    cy.get('button').contains('Update').click()
    cy.wait(300) // transition
    cy.get('[id="timeUnit"]').click().type('1.5')
    cy.get('[id="accountedTimeTypeId"]').click().type('{downArrow}{downArrow}{enter}')
    cy.get('[id="flyout-ticket-time-accounting-title"]').click()
    cy.get('[id="flyout-ticket-time-accounting-title"]').parent().clip().then((TopClip) => {
      cy.get('[id="accountedTimeTypeId"]').clip({ padding: 5 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('time-accounting-dialog', { clip })
        })
      })
    })
    cy.get('button').contains('Account time').click()
    cy.get('[id="ticket-time-accounting-header"]').parent().screenshot('time-accounting-overview', {padding: 5})
  })

  it('bulk action overview side panel', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/view/open-group')
    cy.get('[aria-label="Select this entry"]').first().click()
    cy.get('[aria-label="Select this entry"]').first().click()
    cy.wait(300) // transition
    cy.get('button').contains('Bulk actions').click()
    cy.wait(1000) // transition
    //cy.get('[aria-label="Resize side panel"]').trigger('mousedown').trigger('mousemove', { clientX: 100, clientY: 0 } ).trigger('mouseup')
    //tried to make the flyout smaller to decrease screenshot size
    cy.get('[name="group_id"]').click({ force: true }).type('Infrastructure{downArrow}{enter}')
    cy.get('[name="owner_id"]').click({ force: true }).type('Jackson{downArrow}{enter}')
    cy.get('label').contains('Note').click()
    cy.get('[name="body"]').click().type('Hi Jackson, can you please take care of these tickets? Thanks!')
    cy.get('[id="flyout-tickets-bulk-edit"]').find('header').clip().then((TopClip) => {
      cy.get('[name="internal"]').clip({ padding: 5 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('bulk-side-panel-overviews', { clip })
        })
      })
    })
  })

  it('bulk action overview drag and drop ', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/view/open-group')
    cy.get('[aria-label="Select this entry"]').first().click()
    cy.get('[aria-label="Select this entry"]').first().click().wait(300)
    cy.get('[href="/desktop/tickets/8"]').trigger('pointerdown', { button: 0, buttons: 1, isPrimary: true, force: true })
    cy.wait(1000)
    // RSC: didn't get the "Assign tickets" overlay to show up, so decided to stick with the initial overlay screenshot for now
    cy.document().trigger('pointermove', { clientX: 0, clientY: 0, buttons: 1, isPrimary: true })
    cy.document().trigger('pointermove', { clientX: 960, clientY: 500, buttons: 1, isPrimary: true })
    cy.wait(500)
    cy.screenshot('bulk-action-drag-and-drop')
  })

  it('user popover', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/3')
    cy.wait(3000) // loading
    // changed screenshot to be created from article bubble avatar because it broke when done in ticket header. Can be revisited later.
    cy.get('[aria-label="Avatar (Evelyn Smith) (VIP)"]').last().trigger('mouseenter').wait(1000)
    cy.get('.popover*').screenshot('user-detail-panel', {padding:[ 57, 0, 5, 15 ]})
  })

  it('gitlab sidebar tab', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/6')
    cy.wait(3000) // loading
    cy.get('[aria-label="GitLab"]').click().wait(500)
    cy.get('div.p-3:nth-child(1)').clip({ padding: 0 }).then((TopClip) => {
      cy.get('[aria-label="Checklist"]').clip({ padding: 5 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('gitlab-content-sidebar', { clip })
        })
      })
    })
  })

  it('user detail page', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/users/10')
    cy.wait(3000) // loading
    cy.get('[aria-label="Bar chart showing ticket statistics. Created and closed tickets over the last 12 months."]').should('be.visible')
    cy.wait(1000) // transition
    // cy.get('[aria-label="Avatar (Hannah Taylor)"]').clip().then((TopClip) => {
    cy.get('div.mx-auto.mt-3.flex.w-full.max-w-278').clip( { padding: 10 } ).then((TopClip) => {
      cy.get('[aria-label="Bar chart showing ticket statistics. Created and closed tickets over the last 12 months."]').clip().then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('user-detail-page', { clip })
        })
      })
    })
  })

  it('organization detail page', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/organizations/2')
    cy.wait(3000) // loading
    cy.get('[aria-label="Bar chart showing ticket statistics. Created and closed tickets over the last 12 months."]').should('be.visible')
    cy.wait(1000) // transition
    // cy.get('[aria-label="Avatar (Hannah Taylor)"]').clip().then((TopClip) => {
    cy.get('div.mx-auto.mt-3.flex.w-full.max-w-278').clip( { padding: 10 } ).then((TopClip) => {
      cy.get('[aria-label="Bar chart showing ticket statistics. Created and closed tickets over the last 12 months."]').clip().then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('organization-detail-page', { clip })
        })
      })
    })
  })

    it('escalation-panel', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/3')
    cy.wait(3000) // loading
    cy.get('[aria-label="Show ticket escalation information"]').trigger('mouseenter').wait(1000)
    cy.get('.popover*').should('be.visible')
    cy.get('[aria-label="Show ticket escalation information"]').clip({ padding: 5 }).then((TopClip) => {
      cy.get('.popover*').clip({ padding: 5 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('escalation-panel', { clip })
        })
      })
    })
  })

  it('duplicate detection', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/create')
    cy.get('main').should('exist')
    cy.wait(2000)
    cy.get('[name="customer_id"]').click().type('Petra Parker').wait(1000).type('{downArrow}{enter}')
    cy.wait(500) // to ensure warning is present
    // unusual padding because otherwise it looked off due to being not centered
    cy.get('h1').contains('New ticket').clip({ padding: 0 }).then((TopClip) => {
      cy.get('[aria-label="Petra Parker"]').clip({ padding: 24 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('duplicate-detection', { clip })
        })
      })
    })
  })

    it('text highlighting', () => {
    cy.loginDesktopView(Cypress.env('ADMIN_LOGIN'), Cypress.env('ADMIN_PASS'))
    cy.visit('/desktop/tickets/4')
    cy.wait(3000) // loading
    // tried different approaches to actually highlight text (incl. adding real mouse events) but nothing worked.
    cy.get('[aria-label="Highlight options"]').last().click()
    cy.get('[aria-label="Highlight options"]').last().clip({ padding: 5 }).then((TopClip) => {
      cy.get('[data-id="highlight-menu-popover"]').clip({ padding: 5 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('text-highlighting', { clip })
        })
      })
    })
  })

})