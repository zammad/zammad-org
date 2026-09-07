// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginDesktopView', (userLogin, userPassword, recoveryCode = null) => {
  // Always log out first: a previous test in the same spec file leaves an
  // active session behind (Cypress keeps the browser session between
  // tests), so /desktop would NOT redirect to the login page. Mirrors the
  // proven sequence from guide-ai.cy.js — visit /desktop/logout and assert
  // the login URL before filling the form.
  cy.visit('/desktop/logout', { timeout: 20000 })
  cy.url().should('match', /\/desktop\/login$/)
  window.localStorage.setItem('beta-ui-disclaimer', true)
  cy.get('[name="login"]').type(userLogin)
  cy.get('[name="password"]').type(userPassword)
  cy.get('button').contains('Sign in').click()
  if (recoveryCode) {
    cy.get('a').contains('Try another method').click()
    cy.get('a').contains('Or use one of your recovery codes.').click()
    cy.get('[name="code"]').type(recoveryCode)
    cy.get('button').contains('Sign in').click()
  }
  cy.url().should('not.include', '/desktop/login')
})

// Log into the desktop view with the configured credentials. Kept as a
// shared helper so each spec's `beforeEach` can do `loginAs('ADMIN')`
// instead of repeating the `cy.env(...)` boilerplate in every test.
// `recoveryCode` is only used with AGENT2 (2FA recovery-code login).
Cypress.Commands.add('loginAs', (user = 'ADMIN', recoveryCode = null) => {
  const name = user.toUpperCase()
  if (name !== 'ADMIN' && name !== 'AGENT1' && name !== 'AGENT2') {
    throw new Error(`loginAs: unsupported user "${user}" — use ADMIN, AGENT1 or AGENT2`)
  }
  const account = name === 'AGENT1'
    ? { login: 'AGENT1_LOGIN', pass: 'AGENT1_PASS' }
    : name === 'AGENT2'
      ? { login: 'AGENT2_LOGIN', pass: 'AGENT2_PASS' }
      : { login: 'ADMIN_LOGIN', pass: 'ADMIN_PASS' }
  cy.env([account.login, account.pass]).then((env) => {
    cy.loginDesktopView(env[account.login], env[account.pass], recoveryCode)
  })
})

Cypress.Commands.add('closeTab', (tabTitle) => {
  cy.get(`li.${Cypress.$.escapeSelector('group/tab')}`).contains(tabTitle).first().parent().within(() => {
    cy.get('button').click({ force: true })
  })
})

const waitForGqlResponse = (alias, key) => {
  cy.wait(alias).then((res)=>{
    if (!res.response.body[0].data[key])
      return waitForGqlResponse(alias, key)
    expect(res.response.body[0].data).to.have.key(key)
  })
}

Cypress.Commands.add('waitForGqlResponse', waitForGqlResponse)

Cypress.Commands.add('clip', { prevSubject: 'get'}, ($el, options = { padding: 0 }) => {
  // Clamp the clip rect to the AUT viewport's bounds. The screenshot crop
  // is taken from a viewport-sized frame; a rect past the frame's edge
  // crashes the crop with RangeError: ERR_OUT_OF_RANGE (observed in CI on
  // Cypress 16 / Electron 41). Anchor a fully-clamped rect to the frame
  // edge so the visible part is still captured instead of collapsing the
  // rect to 0x0 (which Cypress writes as an empty PNG and counts as
  // passing).
  //
  // CAUTION: the bare `window`/`document` globals inside support-file code
  // do NOT reference the AUT under Cypress 16 + Electron 41 — they see a
  // zero-size context (CLIPDUMP probe: innerWidth/innerHeight = 0,
  // scrollWidth/scrollHeight = 0), while the jQuery-bridged $el returns
  // real AUT geometry. Always take frame dimensions from cy.window().
  return cy.window({ log: false }).then((win) => {
    const maxY = win.innerHeight
    const maxX = win.innerWidth
    let offset = $el.offset()
    let width = $el.outerWidth()
    let height = $el.outerHeight()

    // An element entirely below/above the fold would clamp to a 1px sliver
    // (silent pass, empty screenshot — new-article.png was 346x1 this way).
    // The app shell scrolls in inner containers, so document coords DO
    // change on scrollIntoView. Bring it into view and re-measure.
    if (offset.top - options.padding >= maxY - 1 || offset.top + height <= 1) {
      $el[0].scrollIntoView({ block: 'center', inline: 'nearest' })
      offset = $el.offset()
      width = $el.outerWidth()
      height = $el.outerHeight()
    }

    const left = Math.max(0, Math.min(offset.left - options.padding, maxX - 1))
    const top = Math.max(0, Math.min(offset.top - options.padding, maxY - 1))
    const right = Math.max(
      left + 1,
      Math.min(offset.left + width + options.padding, maxX),
    )
    const bottom = Math.max(
      top + 1,
      Math.min(offset.top + height + options.padding, maxY),
    )

    return {
      x: left,
      y: top,
      width: right - left,
      height: bottom - top,
    }
  })
})

// Cypress crops ELEMENT screenshots ($el.screenshot({ padding })) at
// element-rect + padding internally — the clip command above can't clamp
// those. When the element's padded rect pokes past the viewport-sized
// frame, the same png.crop RangeError fires (basics.cy.js
// article-type-visibility, fresh-stack run 2026-09-07). Wrap cy.screenshot:
// if a padding element shot would overflow the frame, capture the visible
// part via an explicit clamped clip instead.
Cypress.Commands.overwrite('screenshot', (orig, ...args) => {
  // Element form: ($el, name, opts). Parent form: (name, opts).
  const isElement = args.length > 1 && typeof args[0] !== 'string'
  const subject = isElement ? args[0] : null
  const name = isElement ? args[1] : args[0]
  const opts = (isElement ? args[2] : args[1]) || {}

  // The wrapped original always takes (subject, name, opts) — pass null as
  // subject for page shots, or Cypress iterates the name string as
  // "elements" ('ticket-sidebar' -> 14 elements).
  if (!subject) return orig(subject, name, opts)

  // Guard EVERY element screenshot: Cypress crops element shots at the
  // element rect + padding internally (padding defaults to 0), and a rect
  // past the frame crashes with the png.crop RangeError — with or without
  // an explicit padding option (article-type-visibility is
  // .screenshot(name) with no options at all and still crashed in CI when
  // the form extended below the fold).
  return cy.window({ log: false }).then((win) => {
    const p = opts.padding ?? 0
    const r = subject[0].getBoundingClientRect()
    const doc = win.document
    const box = doc.documentElement
    const scrollX = win.scrollX ?? win.pageXOffset
    const scrollY = win.scrollY ?? win.pageYOffset
    const frameW = Math.max(win.innerWidth, box.clientWidth)
    const frameH = Math.max(win.innerHeight, box.clientHeight)
    const overflowY = r.bottom + scrollY + p > frameH
    const overflowX = r.right + scrollX + p > frameW
    if (!overflowX && !overflowY) return orig(subject, name, opts)

    // Bring the element into view and re-measure before falling back —
    // clipping the unscrolled rect is what produced a 1px dark line when
    // the element sat almost entirely below the fold.
    subject[0].scrollIntoView({ block: 'center', inline: 'nearest' })
    const r2 = subject[0].getBoundingClientRect()
    const overflowY2 = r2.bottom + scrollY + p > frameH
    const overflowX2 = r2.right + scrollX + p > frameW
    if (!overflowX2 && !overflowY2) return orig(subject, name, opts)

    // Still overflowing: fall back to a page-level clip of the element's
    // visible part (element crops can't be clamped from outside). Break
    // the chain with cy.wrap so the element subject doesn't leak into the
    // page shot.
    const x = Math.max(0, Math.round(r2.left + scrollX))
    const y = Math.max(0, Math.round(r2.top + scrollY))
    const width = Math.max(
      1,
      Math.round(Math.min(r2.width, win.innerWidth - x)),
    )
    const height = Math.max(
      1,
      Math.round(Math.min(r2.height, win.innerHeight - y)),
    )
    return cy
      .wrap(null, { log: false })
      .then(() =>
        orig(null, name, { ...opts, padding: 0, clip: { x, y, width, height } }),
      )
  })
})

const clip2Rect = (c) => {
  return {
    xMin: c.x,
    yMin: c.y,
    xMax: c.x + c.width,
    yMax: c.y + c.height,
  }
}

const rect2Clip = (r) => {
  return {
    x: r.xMin,
    y: r.yMin,
    width: r.xMax - r.xMin,
    height: r.yMax - r.yMin,
  }
}

const boundingRect = (r1, r2) => {
  return {
    xMin: Math.min(r1.xMin, r2.xMin),
    yMin: Math.min(r1.yMin, r2.yMin),
    xMax: Math.max(r1.xMax, r2.xMax),
    yMax: Math.max(r1.yMax, r2.yMax),
  }
}

Cypress.Commands.add('mergeClips', (c1, c2) => {
  return cy.wrap(rect2Clip(boundingRect(clip2Rect(c1), clip2Rect(c2))))
})

Cypress.Commands.add('highlight', { prevSubject: 'get' }, ($el, opts = {}) => {
  const options = Object.assign(
    {
      border: 4,
      padding: 10,
    },
    opts,
  )

  // For position:fixed elements (teleported popovers, which don't move with
  // the document) use fixed positioning + viewport coordinates; for everything
  // else use absolute + document coordinates so the overlay survives the
  // element screenshot's scroll (fixed overlays silently drop off the crop
  // when the page is scrolled, see #203 full-suite runs).
  //
  // Read geometry in the AUT window (bare window/document globals inside
  // support-file code are NOT the AUT under Cypress 16 + Electron 41), and
  // wait for the element's rect to stabilize before pinning the overlay:
  // late layout shifts after draw-time are what produced the intermittent
  // offset highlight on article-reply (probe: overlay drawn at top 374.75,
  // element settled at 349.5 — 25px of post-draw drift).
  const isFixed = $el.parents().addBack().toArray().some((el) => {
    return getComputedStyle(el).position === 'fixed'
  })

  const measure = (win) => {
    const rect = $el[0].getBoundingClientRect()
    const scrollX = win.scrollX ?? win.pageXOffset
    const scrollY = win.scrollY ?? win.pageYOffset
    return {
      left: isFixed ? rect.left : rect.left + scrollX,
      top: isFixed ? rect.top : rect.top + scrollY,
      width: $el.outerWidth(),
      height: $el.outerHeight(),
    }
  }

  return cy
    .window({ log: false })
    .then((win) => {
      // Wait until two consecutive measurements agree — the layout has
      // settled and the overlay won't be drawn at stale coordinates.
      const waitForStableRect = (attempt = 0, previous = null) => {
        const m = measure(win)
        if (
          previous &&
          Math.abs(m.left - previous.left) < 0.5 &&
          Math.abs(m.top - previous.top) < 0.5 &&
          Math.abs(m.width - previous.width) < 0.5 &&
          Math.abs(m.height - previous.height) < 0.5
        ) {
          return m
        }
        if (attempt > 40) {
          return m // give up waiting; place at the last measurement
        }
        return Cypress.Promise.delay(100).then(() =>
          waitForStableRect(attempt + 1, m),
        )
      }
      return waitForStableRect().then((m) => {
        const overlay = Cypress.$('<div />', win.document)
          .css('position', isFixed ? 'fixed' : 'absolute')
          .css('z-index', '10000')
          .css('width', m.width + options.padding * 2)
          .css('height', m.height + options.padding * 2)
          .css('left', m.left - options.padding)
          .css('top', m.top - options.padding)
          .css('border-width', `${options.border}px`)
          .css('border-style', 'solid')
          .css('border-image-slice', '1')
          .css(
            'border-image-source',
            'linear-gradient(270deg, #ffce33 30%, #e54011)',
          )

        Cypress.$('body', win.document).append(overlay)
      })
    })
    .then(() => cy.wrap($el))
})

Cypress.Commands.add('touchDeviceEmulation', (enabled) => {
  Cypress.automation('remote:debugger:protocol', {
    command: 'Emulation.setTouchEmulationEnabled',
    params: {
      enabled,
    },
  })
})
