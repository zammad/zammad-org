describe('overview screenshots', () => {
  beforeEach(() => {
    cy.loginAs('ADMIN')
  })

  it('overview full page', () => {
    cy.visit('/desktop/tickets/view/open-group')
    // Wait until the table has actually rendered its rows AND their cell
    // content: the table mounts first with skeleton placeholders in each
    // cell (aria-busy progressbars), which are swapped for data afterwards.
    cy.get('table tbody tr', { timeout: 15000 }).should('have.length.greaterThan', 0)
    cy.get('table [aria-busy="true"]', { timeout: 15000 }).should('not.exist')
    // The first row must show a real ticket title, not a loading bar.
    cy.get('table tbody tr').first().should(($row) => {
      expect($row.text().trim().length).to.be.greaterThan(10)
    })
    cy.screenshot('overview-full')
  })
})
