import { test, expect, loginAs, button, discardDraft, openTicket, screenshotOf } from '../../../support/screenshots.js'

test.describe('editor', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'ADMIN')
  })

  test('editor overview', async ({ page }) => {
    await openTicket(page, 7)
    // A click on "Reply" right after the ticket has loaded can leave the reply
    // form hidden (see guide-ai.spec.js): click again until its editor shows.
    // "Reply" is in the action menu of the article, which closes on a click.
    const editor = page.locator('#ticketArticleReplyForm [role="textbox"]')
    await expect(async () => {
      if (!(await editor.isVisible())) {
        await page.locator('[aria-label="Action menu button"]').first().click({ force: true })
        await button(page, 'Reply').click({ timeout: 5_000 })
      }
      await expect(editor).toBeVisible({ timeout: 5_000 })
    }).toPass({ timeout: 30_000 })
    await editor.click()
    await page.keyboard.type("Thank you for contacting us regarding the issue you're experiencing with your CPU ")
    await page.locator('button[aria-label="Format as bold"]').click()
    // The click can take the focus; the editor keeps the bold mark for the
    // text typed next.
    await editor.focus()
    await page.keyboard.type('XYZ9999 Ultimate.')
    await expect(editor.locator('strong', { hasText: 'XYZ9999 Ultimate.' })).toBeVisible()
    await screenshotOf(page.locator('#ticketArticleReplyForm'), 'editor-overview', 10)
    await discardDraft(page)
  })
})
