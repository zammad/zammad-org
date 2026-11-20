import { test, expect, loginAs, screenshot, textIn } from '../../../support/screenshots.js'

test.describe('user profile screenshot', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'ADMIN')
  })

  test('full page screenshot', async ({ page }) => {
    await page.goto('/desktop/tickets/3')
    const sidebar = page.locator('#ticketSidebar')
    await sidebar.click()
    // Wait for the attribute fields, not just the sidebar shell.
    for (const label of ['Group', 'Owner', 'State', 'Priority']) {
      await expect(textIn(sidebar, label)).toBeVisible()
    }
    // No skeleton placeholders left in the sidebar or the article area.
    await expect(page.locator('#ticketSidebar [aria-busy="true"]')).toHaveCount(0)
    await expect(page.locator('main [aria-busy="true"]')).toHaveCount(0)
    await screenshot(page, 'zammad-ui-full')
  })
})
