describe('caller log screenshots', () => {
  beforeEach(() => {
    cy.loginAs('ADMIN')
  })

  // The caller log renders once its rows have content: the navigation falls
  // back to its own skeletons and the table to a full skeleton page while the
  // query is in flight, and a shot taken in that state shows placeholder bars
  // instead of the feature.
  const waitForCallerLog = () => {
    cy.get('table tbody tr', { timeout: 15000 }).should('have.length.greaterThan', 0)
    cy.get('table [aria-busy="true"]', { timeout: 15000 }).should('not.exist')
    cy.get('table tbody tr').first().should(($row) => {
      expect($row.text().trim().length).to.be.greaterThan(10)
    })
  }

  // Scope every navigation assertion to the sidebar.
  //
  // The caller number of a ringing call appears twice on the page: in the
  // sidebar block and as a From entry in the caller log table. A bare
  // cy.contains() searches the whole document, so "this number is gone from
  // the sidebar" could never pass — the table kept matching it. Scope to nav
  // so these assertions mean what they say.
  const sidebar = () => cy.get('nav')

  // The "switched off" shot switches the caller notification off, which is a
  // real user preference on the account every test logs in as. Restore it
  // after each test instead of at the end of that test: a failed assertion
  // skips trailing steps, and a leaked "off" empties the navigation for the
  // other shots in the run.
  //
  // The restore has to wait for the server round-trip. The switch updates
  // optimistically, so the next test's page load can read the stale "off" from
  // before the write landed and then fail on the missing counter. Waiting on
  // the GraphQL response is what makes the next test see the restored state.
  afterEach(() => {
    cy.get('body', { log: false }).then(($body) => {
      const switchEl = $body.find('button[role="switch"]')

      if (switchEl.length === 0) return
      if (switchEl.attr('aria-checked') !== 'false') return

      // Alias on the exact mutation field rather than a loose substring: the
      // caller log page fires other GraphQL traffic too.
      cy.intercept('POST', '/graphql', (req) => {
        if (JSON.stringify(req.body).includes('userCurrentCallerNotificationUpdate')) {
          req.alias = 'callerNotification'
        }
      })

      cy.wrap(switchEl, { log: false }).click()

      cy.wait('@callerNotification', { timeout: 15000 })
      cy.get('button[role="switch"]', { timeout: 15000 }).should(
        'have.attr',
        'aria-checked',
        'true',
      )
    })
  })

  it('caller log full page', () => {
    cy.visit('/desktop/cti')
    waitForCallerLog()
    cy.screenshot('caller-log-full')
  })

  it('caller log table with caller matches', () => {
    cy.visit('/desktop/cti')
    waitForCallerLog()
    // Crop to the table. In a full-page shot the rows are too small to show
    // what the sections describe: the Maybe badge, the additional-matches
    // badge and the unknown caller avatar.
    cy.get('table').clip({ padding: 10 }).then((tableClip) => {
      cy.screenshot('caller-log-table', { clip: tableClip })
    })
  })

  it('call notifications switched off in the navigation sidebar', () => {
    cy.visit('/desktop/cti')
    waitForCallerLog()
    sidebar().contains('Phone', { timeout: 15000 }).should('be.visible')
    sidebar().contains('unhandled calls', { timeout: 15000 }).should('be.visible')

    // The switch is switched on for this shot and back off afterwards by the
    // afterEach below, which runs even when an assertion fails.
    //
    // Click the switch itself. It renders as a <button role="switch">, not an
    // input, and the surrounding .formkit-wrapper is layout only.
    cy.get('button[role="switch"]').click()
    cy.get('button[role="switch"]').should('have.attr', 'aria-checked', 'false')

    sidebar().contains('unhandled calls', { timeout: 15000 }).should('not.exist')
    sidebar().contains('123456789', { timeout: 15000 }).should('not.exist')

    // Crop the navigation to the Phone entry itself. The switched-on shot
    // covers this entry plus the ringing block below it, so the two together
    // show what the toggle takes away.
    sidebar().contains('Phone').then(($phone) => {
      const padding = 10
      const phoneItem = $phone.closest('li')
      expect(phoneItem, 'no Phone navigation entry found').to.have.length.greaterThan(0)
      const phoneRect = phoneItem[0].getBoundingClientRect()

      cy.screenshot('sidebar-notifications-off', {
        clip: {
          x: Math.max(0, Math.round(phoneRect.left - padding)),
          y: Math.max(0, Math.round(phoneRect.top - padding)),
          width: Math.round(phoneRect.width + (padding * 2)),
          height: Math.round(phoneRect.height + (padding * 2)),
        },
      })
    })
  })

  it('ringing call in the navigation sidebar', () => {
    cy.visit('/desktop/cti')
    waitForCallerLog()
    // The Phone entry only renders with a configured telephony backend, and
    // its unhandled counter plus the ringing block only show while the caller
    // notification is on.
    sidebar().contains('Phone', { timeout: 15000 }).should('be.visible')
    sidebar().contains('unhandled calls', { timeout: 15000 }).should('be.visible')
    // The seeded ringing calls are the last thing to land in the sidebar: one
    // from a known customer and one from a number Zammad knows nobody.
    sidebar().contains('55571630', { timeout: 15000 }).should('be.visible')
    sidebar().contains('123456789', { timeout: 15000 }).should('be.visible')

    // Crop the navigation column from the Phone entry down through the
    // ringing call block below it. The rect is measured live instead of
    // hardcoded, so the crop survives a sidebar reflow.
    sidebar().contains('123456789').then(($ringing) => {
      // The ringing call is a row in the list below the Phone entry. Its list
      // item is the first ancestor <li>, which ends below the number's own
      // inline <span> and therefore gives the full row height.
      const row = $ringing.closest('li')
      expect(row, 'no ringing-call list row found').to.have.length.greaterThan(0)
      const rowRect = row[0].getBoundingClientRect()

      // The Phone entry is the list item above, holding the counter and the
      // caller notification toggle. In the navigation the entries are <li>
      // items of one list, and the ringing call sits in a nested list inside
      // the Phone entry. So the Phone entry is the nearest <li> ancestor that
      // is NOT the ringing row itself — the ringing row is already handled
      // above, and its parent chain passes through the Phone entry.
      const phoneItem = $ringing.parents('li').not(row).last()
      expect(phoneItem, 'no Phone navigation entry found').to.have.length.greaterThan(0)
      const phoneRect = phoneItem[0].getBoundingClientRect()

      const padding = 10
      cy.screenshot('sidebar-ringing-call', {
        clip: {
          x: Math.max(0, Math.round(phoneRect.left - padding)),
          y: Math.max(0, Math.round(phoneRect.top - padding)),
          width: Math.round(phoneRect.width + (padding * 2)),
          // Reach from the top of the Phone entry to the bottom of the
          // ringing call row.
          height: Math.round(rowRect.bottom - phoneRect.top + padding),
        },
      })
    })
  })
})
