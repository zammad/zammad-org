import { test, expect, loginAs, screenshot, box, union, button } from '../../../support/screenshots.js'

test.describe('2FA usage guide', () => {
  test('2FA methods profile setup', async ({ page }) => {
    await loginAs(page, 'ADMIN')
    await page.goto('/desktop/personal-setting/two-factor-auth')
    const breadcrumb = page.locator('[aria-label="Breadcrumb navigation"]')
    const key = page.locator('[aria-label="key"]')
    await expect(breadcrumb).toBeVisible()
    await expect(key).toBeVisible()
    await screenshot(page, '2fa-methods-profile-setup', await union(await box(breadcrumb, 10), await box(key.locator('../..'), 10)))
  })

  // Works up to 50 times per stack: the recovery codes can be used only once.
  test('2FA methods profile overview', async ({ page }) => {
    await loginAs(page, 'AGENT2', '7f80b91f6bcd7b60')
    await page.goto('/desktop/personal-setting/two-factor-auth')
    const breadcrumb = page.locator('[aria-label="Breadcrumb navigation"]')
    // The button's parent.
    const regenerate = button(page, 'Regenerate recovery codes').locator('..')
    await expect(regenerate).toBeVisible()
    await screenshot(page, '2fa-methods-profile-overview', await union(await box(breadcrumb, 10), await box(regenerate, 10)))

    await page.locator('[aria-label="Action menu button for authenticator app"]').click()
    const popover = page.locator('div.popover.fixed')
    await expect(popover).toBeVisible()
    await screenshot(
      page,
      '2fa-methods-profile-action-menu',
      await union(await box(popover, 10), await box(breadcrumb, 10), await box(regenerate, 10)),
    )
  })
})
