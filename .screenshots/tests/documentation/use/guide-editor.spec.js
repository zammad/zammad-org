import { test, expect, loginAs, button, discardDraft, openTicket, screenshotOf } from '../../../support/screenshots.js'

test.describe('editor', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'ADMIN')
  })

  test('editor overview', async ({ page }) => {
    await openTicket(page, 7)
    await page.locator('[aria-label="Action menu button"]').first().click()
    await button(page, 'Reply').click()
    const editor = page.locator('[role="textbox"]')
    await expect(editor).toBeVisible()
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
