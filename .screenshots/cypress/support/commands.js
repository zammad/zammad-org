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
  const offset = $el.offset()
  const width = $el.outerWidth()
  const height = $el.outerHeight()

  return cy.wrap({
    x: offset.left - options.padding,
    y: offset.top - options.padding,
    width: width + options.padding * 2,
    height: height + options.padding * 2,
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

  const offset = $el.offset()
  const width = $el.outerWidth()
  const height = $el.outerHeight()

  // For position:fixed elements (teleported popovers, which don't move with
  // the document) use fixed positioning + viewport coordinates; for everything
  // else use absolute + document coordinates so the overlay survives the
  // element screenshot's scroll (fixed overlays silently drop off the crop
  // when the page is scrolled, see #203 full-suite runs).
  const isFixed = $el.parents().addBack().toArray().some((el) => {
    return getComputedStyle(el).position === 'fixed'
  })
  const rect = $el[0].getBoundingClientRect()
  const scrollX = window.scrollX ?? window.pageXOffset
  const scrollY = window.scrollY ?? window.pageYOffset
  const left = isFixed ? rect.left : rect.left + scrollX
  const top = isFixed ? rect.top : rect.top + scrollY

  const overlay = Cypress.$('<div />')
    .css('position', isFixed ? 'fixed' : 'absolute')
    .css('z-index', '10000')
    .css('width', width + options.padding * 2)
    .css('height', height + options.padding * 2)
    .css('left', left - options.padding)
    .css('top', top - options.padding)
    .css('border-width', `${options.border}px`)
    .css('border-style', 'solid')
    .css('border-image-slice', '1')
    .css('border-image-source', 'linear-gradient(270deg, #ffce33 30%, #e54011)')

  Cypress.$('body').append(overlay)

  return cy.wrap($el)
})

Cypress.Commands.add('touchDeviceEmulation', (enabled) => {
  Cypress.automation('remote:debugger:protocol', {
    command: 'Emulation.setTouchEmulationEnabled',
    params: {
      enabled,
    },
  })
})
