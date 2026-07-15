describe('ticket sidebar', () => {
  it('ticket sidebar', () => {
    cy.env(['ADMIN_LOGIN', 'ADMIN_PASS']).then(({ ADMIN_LOGIN, ADMIN_PASS }) => {
      cy.loginDesktopView(ADMIN_LOGIN, ADMIN_PASS)
    })
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
    cy.env(['ADMIN_LOGIN', 'ADMIN_PASS']).then(({ ADMIN_LOGIN, ADMIN_PASS }) => {
      cy.loginDesktopView(ADMIN_LOGIN, ADMIN_PASS)
    })
    cy.visit('/desktop/tickets/create')
    cy.get('main').should('exist')
    cy.wait(2000)
    cy.get('[aria-label="New ticket"]').highlight()
    cy.get('[id="ticket-create"]').highlight()
    cy.screenshot('ticket-create')
  })

  it('article type visibility', () => {
    cy.env(['ADMIN_LOGIN', 'ADMIN_PASS']).then(({ ADMIN_LOGIN, ADMIN_PASS }) => {
      cy.loginDesktopView(ADMIN_LOGIN, ADMIN_PASS)
    })
    cy.visit('/desktop/tickets/6')
    cy.get('main').should('exist')
    cy.wait(2000)
    cy.get('button').contains('Add internal note').click()
    cy.wait(1000)
    cy.get('[id="ticketArticleReplyForm"]').should('be.visible').screenshot('article-type-visibility')
    cy.get('button').contains('Discard your unsaved changes').click()
    cy.get('button').contains('Discard changes').click()
  })

  it('new article', () => {
    cy.env(['ADMIN_LOGIN', 'ADMIN_PASS']).then(({ ADMIN_LOGIN, ADMIN_PASS }) => {
      cy.loginDesktopView(ADMIN_LOGIN, ADMIN_PASS)
    })
    cy.visit('/desktop/tickets/6')
    cy.get('main').should('exist')
    cy.wait(2000)
    cy.get('button').contains('Add internal note').should('be.visible').parent().clip({ padding: 5 }).then((TopClip) => {
      cy.get('span').contains('or use the reply actions on articles.').should('be.visible').parent().clip({ padding: 5 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('new-article', { clip })
        })
      })
    })
  })

  it('article reply', () => {
    cy.env(['ADMIN_LOGIN', 'ADMIN_PASS']).then(({ ADMIN_LOGIN, ADMIN_PASS }) => {
      cy.loginDesktopView(ADMIN_LOGIN, ADMIN_PASS)
    })
    cy.visit('/desktop/tickets/4')
    cy.get('main').should('exist')
    cy.wait(2000)
    cy.touchDeviceEmulation(true) // enable touch emulation temporarily to show the reply and reply all actions
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
    cy.touchDeviceEmulation(false) // disable touch emulation again
  })

  it('article reply pinned', () => {
    cy.env(['ADMIN_LOGIN', 'ADMIN_PASS']).then(({ ADMIN_LOGIN, ADMIN_PASS }) => {
      cy.loginDesktopView(ADMIN_LOGIN, ADMIN_PASS)
    })
    cy.visit('/desktop/tickets/6')
    cy.get('main').should('exist')
    cy.wait(2000)
    // Open the reply form (note type) so the ArticleReply panel mounts and
    // the pin/resize affordances become accessible. The panel's outer
    // wrapper in ArticleReply.vue is gated by `v-if="newArticlePresent"`,
    // so without this click there is no pin button to find.
    cy.get('button').contains('Add internal note').should('be.visible').click()
    cy.wait(500)
    // Click the pin button to flip isReplyPinned (read on ArticleReply.vue
    // line 69 to apply the sticky-bottom + self-end layout). After this
    // click, the toolbar inside the panel becomes the pinned variant,
    // the article feed is scrolled to the end, and the resize handle at
    // the top of the pinned panel is focusable.
    cy.get('button[aria-label="Pin this panel"]').should('be.visible').click({ force: true })
    cy.wait(500)
    // Resize the pinned panel to a useful visible height via the keyboard
    // resize hook on the ResizeLine (see useResizeLine.ts: ArrowUp adds 5
    // px per press, gated on the resize-line element being focused).
    // Default is 290 px; 34 presses brings it to 460 px (screenHeight/2 is
    // 540 px on a 1080 viewport, so 460 is within bounds).
    cy.get('button[aria-label="Resize article panel"]')
      .should('exist')
      .click({ force: true })
    for (let i = 0; i < 34; i += 1) cy.get('button[aria-label="Resize article panel"]').type('{upArrow}', { force: true })
    cy.wait(500)
    // Wait for the inline-style height on the panel to settle so the
    // screenshot shows the resized panel rather than the default 290 px.
    cy.get('[id="ticketArticleReplyForm"]')
      .should('be.visible')
      .parents('div')
      .filter('[style*="height"]')
      .first()
      .invoke('attr', 'style')
      .should('include', 'height: 460px')
    // Use Zammad's own "Scroll to start" affordance rather than fighting
    // the auto-scroll-to-bottom that fires on mount. The button is part of
    // the FloatingToolbar inside the pinned reply panel, only renders when
    // the user is NOT at the top, and clicking it calls
    // `scrollIntoView('start', ...)` which sets `scrollTop = 0` via the
    // container's native `scrollTo`. The button gets its `aria-label` from
    // the `v-tooltip="$t('Scroll to start')"` directive
    // (see directives/tooltip/index.ts:245). After click, the auto-scroll
    // watchers won't re-trigger because they all use `{ once: true }` or
    // guard via `scrollScope.stop()`.
    cy.get('[aria-label="Scroll to start"]')
      .should('exist')
      .wait(500)
      .click({ force: true })
      .wait(800)
    // Highlight the pin button so the use-case is unambiguous at a glance.
    // The skill's `references/cypress-screenshots.md` notes the `highlight()`
    // overlay uses `position: fixed` but reads `$el.offset()` (document-
    // relative), so the page must be at scrollTop=0 — which it is now.
    cy.get('button[aria-label="Unpin this panel"]')
      .should('be.visible')
      .wait(500)
      .highlight()
      .wait(300)
    // Full-viewport screenshot — the pinned panel + articles above tell the
    // story without needing a clip (which can be zero-dimension in headless).
    cy.screenshot('article-reply-pinned')
    // Clean up so the next specs open with the default unpinned form.
    cy.window().then((win) => {
      win.localStorage.setItem('article-reply-pinned', 'false')
      const heightKey = Object.keys(win.localStorage).find((k) =>
        /article-reply-height$/.test(k),
      )
      if (heightKey) win.localStorage.removeItem(heightKey)
    })
  })

  it('copy ticket number button', () => {
    cy.env(['ADMIN_LOGIN', 'ADMIN_PASS']).then(({ ADMIN_LOGIN, ADMIN_PASS }) => {
      cy.loginDesktopView(ADMIN_LOGIN, ADMIN_PASS)
    })
    cy.visit('/desktop/tickets/4')
    cy.get('main').should('exist')
    cy.wait(2000)
    // Scope the highlight to the full top-bar variant. Without this scope the
    // first matched element is the off-viewport button and the highlighting
    // ends up outside the clipped breadcrumb area.
    //
    // We scope via [aria-label="Breadcrumb navigation"] because the
    // CommonBreadcrumb (and its aria-label) only renders in the full
    // variant — the compact variant puts the ticket number in a bare <h1>
    // without a breadcrumb wrapper.
    cy.get('[aria-label="Breadcrumb navigation"] [aria-label="Copy ticket number"]')
      .should('be.visible')
      .highlight()
      .wait(300)
    cy.get('[aria-label="Breadcrumb navigation"]').should('be.visible').clip({ padding: 10 }).then((TopClip) => {
      cy.get('[aria-label="Open checklist"]').should('be.visible').clip({ padding: 10 }).then((BottomClip) => {
        cy.mergeClips(TopClip, BottomClip).then((clip) => {
          cy.screenshot('copy-ticket-number-button', { clip })
        })
      })
    })
  })
})
