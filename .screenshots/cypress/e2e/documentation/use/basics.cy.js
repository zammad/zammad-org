describe('ticket sidebar', () => {
  // Log in once per test instead of repeating the cy.env().then(login) boilerplate.
  beforeEach(() => {
    cy.loginAs('ADMIN')
  })

  // Ticket 6's reply area has two states:
  //   * closed -> a visible "Add internal note" button next to the
  //               "or use the reply actions on articles." label
  //   * open   -> a #ticketArticleReplyForm panel (button hidden by design,
  //               see FloatingToolbar's hidePrimaryAction)
  // A leftover draft from a prior test can leave the form open, so
  // closeReplyFormIfOpen() normalises first.

  function closeReplyFormIfOpen () {
    cy.window().then((win) => {
      if (win.document.getElementById('ticketArticleReplyForm')) {
        cy.get('button').contains('Discard your unsaved changes').click()
        cy.get('button').contains('Discard changes').click()
      }
    })
  }

  // Open the note reply form. The click target is selected with the
  // document-scoped cy.contains(button, text) — the button text is unique in
  // the DOM, so this is immune to whichever button happens to be first.
  function openNoteForm () {
    closeReplyFormIfOpen()
    cy.contains('button', 'Add internal note', { timeout: 20000 })
      .should('be.visible')
      .click()
    cy.get('#ticketArticleReplyForm', { timeout: 15000 }).should('be.visible')
  }

  it('ticket sidebar', () => {
    cy.visit('/desktop/tickets/6')
    cy.get('main').should('exist')
    // Wait for the sidebar's attribute fields to render — they arrive after
    // the sidebar shell (this is what the article screenshot shows).
    cy.get('#ticketSidebar', { timeout: 15000 }).should('be.visible')
    cy.get('#ticketSidebar').contains('State', { timeout: 15000 }).should('be.visible')
    cy.get('#ticketSidebar').contains('Owner', { timeout: 15000 }).should('be.visible')
    // Wait for every asynchronous sidebar section to reach its settled state:
    // each section renders a skeleton ([aria-busy="true"]) before its payload
    // arrives, so check per section — a global check can pass while a section
    // is still mounting. The section content wrapper carries a stable id
    // (verified in the live DOM); waiting for it guarantees the section has
    // mounted before its skeleton check runs.
    for (const section of [
      { name: 'Attributes', id: 'ticket-attributes' },
      { name: 'Related tickets', id: 'ticket-links' },
      { name: 'Related knowledge', id: 'ticket-ai-knowledge-base-answers' },
      { name: 'Subscribers', id: 'ticket-subscribers' },
    ]) {
      cy.get(`[id="${section.id}"]`, { timeout: 15000 }).should('exist')
      cy.get(`[id="${section.id}"]`).find('[aria-busy="true"]', { timeout: 15000 }).should('not.exist')
    }
    cy.get('[id="ticket-subscribers"]', { timeout: 15000 }).should('be.visible')
    cy.get('[aria-label="Ticket"]').clip({ padding: 10 }).then((TopClip) => {
      cy.get('[id="ticket-subscribers"]').clip({ padding: 10 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) =>
          cy.screenshot('ticket-sidebar', { clip }),
        )
      })
    })
  })

  it('ticket create', () => {
    cy.visit('/desktop/tickets/create')
    cy.get('main').should('exist')
    // The create form is only fully loaded when its attribute fields are
    // present — before that a loading spinner shows.
    cy.contains('main label', 'Group', { timeout: 15000 }).should('be.visible')
    cy.contains('main label', 'State', { timeout: 15000 }).should('be.visible')
    cy.get('[aria-label="New ticket"]', { timeout: 15000 }).should('be.visible')
    cy.get('[id="ticket-create"]').highlight()
    cy.get('[aria-label="New ticket"]').highlight()
    cy.screenshot('ticket-create')
  })

  it('article type visibility', () => {
    cy.visit('/desktop/tickets/6')
    cy.get('main').should('exist')
    // Wait for either the already-open form (a persisted draft) or the
    // closed-state "Add internal note" primary action before interacting.
    cy.get('#ticketArticleReplyForm, button:contains("Add internal note")', { timeout: 20000 }).should('exist')
    cy.document().then((doc) => {
      if (!doc.getElementById('ticketArticleReplyForm')) {
        cy.contains('button', 'Add internal note').click()
      }
    })
    cy.wait(1000)
    // Highlight the visibility toggle (role=switch) and its "Internal" label.
    cy.get('#ticketArticleReplyForm [role="switch"]').parent().highlight({ padding: 8 })
    cy.get('[id="ticketArticleReplyForm"]').should('be.visible').screenshot('article-type-visibility')
    cy.get('button').contains('Discard your unsaved changes').click()
    cy.get('button').contains('Discard changes').click()
  })

  it('new article', () => {
    cy.visit('/desktop/tickets/6')
    cy.get('main').should('exist')
    closeReplyFormIfOpen()
    // Wait for the closed-state reply area (button + label) to render.
    cy.get('button:contains("Add internal note")', { timeout: 20000 }).should('exist')
    cy.get('button').contains('Add internal note').should('be.visible').parent().clip({ padding: 5 }).then((TopClip) => {
      cy.get('span').contains('or use the reply actions on articles.').should('be.visible').parent().clip({ padding: 5 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('new-article', { clip })
        })
      })
    })
  })

  it('article reply', () => {
    cy.visit('/desktop/tickets/4')
    cy.get('main').should('exist')
    cy.wait(2000) // settle the ticket view — clicking earlier grabs the wrong menu
    cy.touchDeviceEmulation(true) // show the reply / reply-all actions
    cy.get('[aria-label="Action menu button"]').first().click()
    cy.wait(500)
    cy.get('[aria-label="Action menu button"]').first().parent().parent().should('be.visible').highlight().clip({ padding: 5 }).then((HighlightClip) => {
      cy.get('[data-test-id="article-bubble-container-8"]').should('be.visible').clip({ padding: 5 }).then((TopClip) => {
        cy.get('[role="menu"]').last().should('be.visible').clip({ padding: 5 }).then((BottomClip) => {
          cy.mergeClips(HighlightClip, TopClip).then((merged) => {
            cy.mergeClips(merged, BottomClip).then((clip) => {
              cy.screenshot('article-reply', { clip })
            })
          })
        })
      })
    })
    cy.touchDeviceEmulation(false)
  })

  it('article reply pinned', () => {
    cy.visit('/desktop/tickets/6')
    cy.get('main').should('exist')
    openNoteForm()
    cy.get('button[aria-label="Pin this panel"]', { timeout: 15000 }).should('be.visible').click({ force: true })
    cy.get('button[aria-label="Resize article panel"]').should('exist').click({ force: true })
    // Resize to ~460px (34 × 5px on top of the default 290px).
    for (let i = 0; i < 34; i += 1) {
      cy.get('button[aria-label="Resize article panel"]').type('{upArrow}', { force: true })
    }
    cy.get('#ticketArticleReplyForm')
      .should('be.visible')
      .parents('div')
      .filter('[style*="height"]')
      .first()
      .invoke('attr', 'style')
      .should('include', 'height: 460px')
    cy.get('[aria-label="Scroll to start"]').should('exist').click({ force: true })
    cy.window().its('scrollY').should('eq', 0)
    // The floating actions toolbar (scroll-to-start/end widget) must have
    // its real buttons, not a skeleton placeholder.
    cy.get('[aria-label="Scroll to end"]', { timeout: 10000 }).should('be.visible')
    cy.get('main [aria-busy="true"]', { timeout: 10000 }).should('not.exist')
    cy.get('button[aria-label="Unpin this panel"]').should('be.visible').highlight()
    cy.screenshot('article-reply-pinned')
    // Reset pin/height so the next spec opens with the default unpinned form.
    cy.window().then((win) => {
      win.localStorage.setItem('article-reply-pinned', 'false')
      const heightKey = Object.keys(win.localStorage).find((k) => /article-reply-height$/.test(k))
      if (heightKey) win.localStorage.removeItem(heightKey)
    })
    closeReplyFormIfOpen()
  })

  it('copy ticket number button', () => {
    cy.visit('/desktop/tickets/4')
    cy.get('main').should('exist')
    cy.get('[aria-label="Breadcrumb navigation"] [aria-label="Copy ticket number"]', { timeout: 15000 })
      .should('be.visible')
      .highlight()
    cy.get('[aria-label="Breadcrumb navigation"]').should('be.visible').clip({ padding: 10 }).then((TopClip) => {
      cy.get('[aria-label="Open checklist"]').should('be.visible').clip({ padding: 10 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('copy-ticket-number-button', { clip })
        })
      })
    })
  })
})
