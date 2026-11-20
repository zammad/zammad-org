import { test, expect, loginAs, screenshot, box, union, button, textIn } from '../../../support/screenshots.js'

test.describe('user profile screenshot', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'ADMIN')
  })

  test('full page screenshot', async ({ page }) => {
    await page.goto('/desktop/personal-setting/appearance')
    await expect(textIn(page, 'Appearance')).toBeVisible()
    // The navigation loads its taskbar tabs separately: wait for their
    // placeholder rows to clear.
    await expect(page.locator('#page-navigation')).toBeAttached()
    await expect(page.locator('[role="progressbar"][aria-busy="true"]')).toHaveCount(0)
    await screenshot(page, 'user-profile-settings-full')
  })

  test('avatar menu', async ({ page }) => {
    await loginAs(page, 'AGENT1')
    const userMenu = page.locator('button#user-menu')
    await userMenu.click()
    const popover = page.locator('[id="user-menu-popover"]')
    await expect(popover).toBeVisible()
    // The navigation shows the ringing calls above its footer, and every call
    // row has its own "New ticket" button. Anchor the clip on the footer's
    // button next to the avatar, or a ringing call drags it up the sidebar.
    const footerNewTicket = userMenu.locator('xpath=../following-sibling::*[1]').locator('[aria-label="New ticket"]')
    await expect(footerNewTicket).toBeVisible()
    // The avatar photo is a CSS background image: make sure it has loaded, or
    // the shot can catch the plain colour fallback.
    await page.locator('button#user-menu [aria-label^="Avatar"]').evaluate(async (avatar) => {
      const url = /url\(["']?([^"')]+)["']?\)/.exec(avatar.style.backgroundImage)?.[1]
      if (!url) throw new Error('The avatar has no background image.')
      const image = new Image()
      image.src = url
      await image.decode()
    })
    await page.waitForTimeout(250) // let the decoded avatar paint
    await screenshot(
      page,
      'avatar-menu',
      await union(await box(popover, 5), await box(userMenu, 5), await box(footerNewTicket, 5)),
    )
  })

  test('token creation', async ({ page }) => {
    await page.goto('/desktop/personal-setting/token-access')
    await button(page, 'New personal access token').click()
    const title = page.locator('[id="flyout-new-access-token-title"]')
    await expect(title).toBeVisible()
    const labels = page.locator('label')
    await textIn(labels, 'Name').click()
    await page.keyboard.type('App API token')
    await textIn(labels, 'Admin interface').click()
    await textIn(labels, 'Profile settings').click()
    await page.locator('[aria-label="Toggle group"]').last().click()
    await textIn(labels, 'Agent tickets').click()
    await button(page, 'Create').click()
    // The dialog with the token and its Copy button is the end state.
    const copy = textIn(page.locator('button'), 'Copy token')
    await copy.click()
    await screenshot(page, 'token-dialog', await union(await box(title, 10), await box(copy, 25)))

    // Delete the tokens of this and earlier runs, so that they do not pile up.
    // The deletion currently fails upstream ("The personal access token could
    // not be deleted."): TokenPolicy compares the token's user with the
    // UserContext delegator of the current user, which never matches. The
    // request completes either way, so the test waits for it and moves on.
    await textIn(page, 'OK, I have copied my token').click()
    const ids = await page
      .locator('table tbody tr', { hasText: 'App API token' })
      .evaluateAll((rows) => rows.map((row) => row.getAttribute('data-item-id')))
    for (const id of ids) {
      const deleted = page.waitForResponse(
        (response) =>
          response.url().endsWith('/graphql') &&
          (response.request().postData() || '').includes('userCurrentAccessTokenDelete'),
      )
      await page.locator(`tr[data-item-id="${id}"] button[aria-label="Delete this access token"]`).click()
      await page.locator('button', { hasText: 'Delete object' }).click()
      await deleted
    }
  })
})
