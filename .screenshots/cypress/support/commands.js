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
  cy.visit('/desktop')
  cy.url().should('match', new RegExp('/desktop/login$'))
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

Cypress.Commands.add('highlight', { prevSubject: 'get' }, ($el) => {
  const overlay = Cypress.$('<div />')
    .css('position', 'fixed')
    .css('inset', 0)
    .css('background-color', 'rgba(0,0,0,0.5)')
    .css('z-index', '10000')

  $el.css('box-shadow', '0px 0px 15px 10px rgba(255,255,255,0.6)')
    .css('z-index', '10001')
    .before(overlay)

  return cy.wrap($el)
})
