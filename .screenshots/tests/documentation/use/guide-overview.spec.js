import { test, expect, loginAs, screenshot } from '../../../support/screenshots.js'

test.describe('overview screenshots', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'ADMIN')
  })

  test('overview full page', async ({ page }) => {
    await page.goto('/desktop/tickets/view/open-group')
    // The table mounts with skeleton placeholders in each cell (aria-busy
    // progress bars), which are swapped for the data afterwards.
    await expect(page.locator('table tbody tr').first()).toBeVisible()
    await expect(page.locator('table [aria-busy="true"]')).toHaveCount(0)
    await expect(page.locator('table tbody tr').first()).toHaveText(/\S.{9,}/)
    await screenshot(page, 'overview-full')
  })
})
