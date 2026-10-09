describe('caller log screenshots', () => {
  // The caller notification is a real per-user preference on the account every
  // test logs in as, and the "switched off" shot below flips it. The switch
  // updates optimistically, so its aria-checked state proves nothing about what
  // the server stored — and two rapid clicks (off for the shot, on again for the
  // next test) can land out of order. Read the persisted value back and retry
  // until the server agrees instead of trusting the click. Running this before
  // each test also repairs a stack an earlier run left dirty.
  const callerNotificationOnServer = () =>
    cy
      .request({
        method: 'POST',
        url: '/graphql',
        failOnStatusCode: false,
        body: {
          query: 'query { currentUser { personalSettings { callerNotificationEnabled } } }',
        },
      })
      .then((res) => {
        const { body } = res
        if (!body.data) {
          throw new Error(`caller notification query failed: ${JSON.stringify(body)}`)
        }
        return body.data.currentUser.personalSettings.callerNotificationEnabled
      })

  const ensureCallerNotification = (enabled, rounds = 3) => {
    const attempt = (left) =>
      callerNotificationOnServer().then((actual) => {
        if (actual === enabled) return

        if (left === 0) {
          expect(actual, 'caller notification could not be brought to the wanted state').to.equal(
            enabled,
          )
          return
        }

        // The switch sits in the navigation, so the caller log route has to be
        // open before it can be clicked. Re-visit rather than relying on
        // wherever the previous test left the browser, then give the mutation
        // time to land before asking the server again.
        cy.visit('/desktop/cti')
        cy.get('button[role="switch"]', { timeout: 15000 }).should('exist')
        cy.get('button[role="switch"]').click()
        cy.wait(2000)

        return attempt(left - 1)
      })

    return attempt(rounds)
  }

  beforeEach(() => {
    cy.loginAs('ADMIN')
    ensureCallerNotification(true)
  })

  // Restore in afterEach instead of as a trailing step of the test that flips
  // it: a failed assertion skips trailing steps, and a leaked "off" empties the
  // navigation for every shot after it.
  afterEach(() => ensureCallerNotification(true))

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

    // This shot needs the caller notification off. The afterEach below turns it
    // back on, and runs even when an assertion fails.
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
