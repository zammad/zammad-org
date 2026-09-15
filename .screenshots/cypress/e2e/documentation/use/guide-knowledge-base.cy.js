describe('knowledge base screenshots', () => {
  beforeEach(() => {
    cy.loginAs('ADMIN')
  })

  // On a fresh browser profile the "New desktop BETA UI" disclaimer overlays
  // the view; confirm it away when it is up.
  const dismissBetaUiDisclaimer = () => {
    cy.document().then((doc) => {
      const confirm = Array.from(doc.querySelectorAll('button'))
        .find((b) => b.innerText.trim() === 'Confirm')
      if (confirm) confirm.click()
    })
  }

  // The KB top bar carries two "Additional actions" buttons in the DOM (the
  // second one belongs to the hidden legacy header); only the one in the
  // visible top bar is clickable.
  const openHeaderMenu = () => {
    cy.get('button[aria-label="Additional actions"]').then(($btns) => {
      const visible = $btns.filter((i, el) => {
        const rect = el.getBoundingClientRect()
        return rect.width > 0 && rect.height > 0 && rect.top >= 0 && rect.top < 200
      })
      if (!visible.length) throw new Error('NO_VISIBLE_ADDITIONAL_ACTIONS')
      return cy.wrap(visible.first())
    }).then(($btn) => {
      cy.wrap($btn).scrollIntoView().click({ force: true })
    })
    cy.get('[role="menuitem"]', { timeout: 10000 }).should('be.visible')
  }

  const browseCategory = () => {
    // Category 2 is "Products and orders" (seeded with two sub-categories
    // and answers). Go straight to its inside-category view.
    cy.visit('/desktop/knowledge-base/locale/en-us/category/2')
    cy.get('main', { timeout: 20000 }).should('be.visible').then(dismissBetaUiDisclaimer)
    cy.contains('main', 'Products and orders', { timeout: 20000 }).should('be.visible')
    cy.contains('main', 'Shipping and delivery', { timeout: 20000 }).should('be.visible')
    cy.contains('main', 'Self-service orders', { timeout: 20000 }).should('be.visible')
    cy.contains('main', 'Return and exchange policy', { timeout: 20000 }).should('be.visible')
    cy.get('main [aria-busy="true"]', { timeout: 15000 }).should('not.exist')
  }

  it('knowledge base full page', () => {
    browseCategory()
    cy.screenshot('knowledge-base-full')
  })

  it('category flyout', () => {
    browseCategory()
    // Open the first sub-category's tile action menu and pick "Edit category":
    // the flyout holds the title, icon and parent fields. The icon picker
    // stays closed so all fields are visible in the shot.
    cy.get('button[aria-label="Category actions"]', { timeout: 10000 }).first().click()
    cy.get('[role="menuitem"]:contains("Edit category")', { timeout: 10000 }).should('be.visible').click()
    cy.get('output[name="categoryIcon"]', { timeout: 10000 }).should('be.visible')
    cy.wait(500) // flyout transition
    // Crop to the flyout panel itself (probe-verified: it is pinned to the
    // right edge at left=1420, width=500), from the top down to just under
    // the permissions table (`table.pb-3` carries its own 12px bottom
    // padding; +4 more so the rounded row edges stay whole) — the tall empty
    // stretch above the footer is not in the shot and no page background is
    // visible beside the panel.
    cy.document().then((doc) => {
      const fly = doc.getElementById('flyout-knowledge-base-category')
      if (!fly) throw new Error('NO_FLYOUT')
      const table = fly.querySelector('table')
      if (!table) throw new Error('NO_PERMISSIONS_TABLE')
      const rect = fly.getBoundingClientRect()
      const x = Math.floor(rect.left)
      const width = Math.ceil(rect.right - rect.left)
      const height = Math.ceil(table.getBoundingClientRect().bottom) + 4
      cy.screenshot('kb-category-flyout', { clip: { x, y: 0, width, height } })
    })
  })

  it('sort content', () => {
    browseCategory()
    openHeaderMenu()
    cy.contains('[role="menuitem"]', 'Sort content').click()
    // The bar mounts at the bottom with the mode tabs and the two actions.
    cy.get('[role="tab"]:contains("Sort alphabetically")', { timeout: 10000 }).should('be.visible')
    cy.get('[role="tab"]:contains("Categories")').should('be.visible')
    // Switch to the Answers tab: both lists stay mounted, the scope tabs
    // drive which one is visible, so wait on content for the swap to settle.
    cy.get('[role="tab"]:contains("Answers")').click()
    // The grid and the list are mutually exclusive (probe-verified): the
    // category tile must be in a display:none subtree and the answer rows
    // must be rendered, before the shot catches the fade-in transition.
    cy.document({ timeout: 20000 }).should((doc) => {
      const tiles = Array.from(doc.querySelectorAll('main *'))
        .filter((el) => el.textContent.trim() === 'Self-service orders')
      for (const leaf of tiles) {
        let n = leaf, hidden = false
        while (n && n.tagName !== 'MAIN' && n !== doc.body) {
          if (getComputedStyle(n).display === 'none') { hidden = true; break }
          n = n.parentElement
        }
        if (!hidden) throw new Error('category tile still visible')
      }
    })
    cy.contains('main', 'How to track your order', { timeout: 20000 }).should('be.visible')
    // Highlight both switchers: the scope tabs above the list and the mode
    // pills in the bottom bar (their common tab-group wrappers).
    cy.get('[role="tab"]:contains("Categories")').parent().parent().highlight({ padding: 8 })
    cy.get('[role="tab"]:contains("Sort alphabetically")').parent().parent().highlight({ padding: 8 })
    cy.screenshot('kb-sort-content', { clip: { x: 0, y: 0, width: 1920, height: 1080 } })
    // Leave the sorting mode so later tests are not locked out of navigation.
    cy.contains('button', 'Cancel').click()
  })

  it('scheduled visibility sidebar', () => {
    // Answer 7 is "Delivery times and shipping costs", seeded with a future
    // archived_at so the section lists an entry.
    cy.visit('/desktop/knowledge-base/locale/en-us/answer/7/edit')
    cy.get('main', { timeout: 20000 }).should('be.visible').then(dismissBetaUiDisclaimer)
    cy.contains('main', 'Delivery times and shipping costs', { timeout: 20000 }).should('be.visible')
    cy.get('#knowledge-base-scheduled-visibility', { timeout: 15000 }).should('be.visible')
    cy.get('#knowledge-base-scheduled-visibility [aria-busy="true"]', { timeout: 15000 }).should('not.exist')
    // The seeded schedule is rendered as "Archived — in 3 months".
    cy.get('#knowledge-base-scheduled-visibility').contains('Archived', { timeout: 10000 }).should('be.visible')
    // The "Related tickets" section (below) mounts on its own debounced Apollo
    // load; the "Link ticket" button only exists in the DOM once that load
    // settles, so wait for the button directly rather than relying on the
    // scheduled-visibility settle + a fixed sleep.
    cy.get('#kb-related-tickets', { timeout: 15000 }).should('exist')
    cy.get('#kb-related-tickets', { timeout: 20000 })
      .find('button[aria-label="Link ticket"]').should('exist')
    // Highlight the section's p-3 wrapper (probe-verified: it contains the
    // "Scheduled visibility" header at +16px and the entry list) — the bare
    // id element is content-only and produced a headerless offset highlight.
    // No extra padding: the wrapper's own p-3 already breathes around the
    // content, so the highlight hugs the section boundary itself.
    cy.get('#knowledge-base-scheduled-visibility').parent().highlight({ padding: 0 })
    // Crop to the sidebar panel itself (probe-verified: `#content-sidebar`
    // spans left=1560 to right=1920 on the 1920-wide CI viewport; the highlight
    // overlay sits at left=1561, one pixel inside, so cropping to the panel
    // keeps the highlight fully visible). The old hard-coded `x:1551, width:369`
    // left a 9px dark page-background strip on the left. From the top down to
    // just under the Related tickets section (its "Link ticket" button bottom
    // +30) so the crop ends right after it.
    cy.document().then((doc) => {
      const panel = doc.getElementById('content-sidebar')
      if (!panel) throw new Error('NO_SIDEBAR_PANEL')
      const linkTicket = Array.from(doc.querySelectorAll('button'))
        .find((b) => b.getAttribute('aria-label') === 'Link ticket')
      if (!linkTicket) throw new Error('NO_LINK_TICKET_BUTTON')
      const rect = panel.getBoundingClientRect()
      const x = Math.floor(rect.left)
      const width = Math.ceil(rect.right - rect.left)
      const bottom = Math.ceil(linkTicket.getBoundingClientRect().bottom) + 30
      cy.screenshot('kb-scheduled-visibility', { clip: { x, y: 0, width, height: bottom } })
    })
    // Leave the edit tab without changes so no draft leaks into other specs.
    cy.visit('/desktop/logout')
  })
})
