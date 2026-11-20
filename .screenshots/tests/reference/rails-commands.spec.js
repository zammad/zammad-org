import { test, expect, loginAs, button, discardDraft, screenshotOf } from '../../support/screenshots.js'

test.describe('Rails commands screenshots', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'ADMIN')
  })

  test('article creation note', async ({ page }) => {
    await page.goto('/desktop/tickets/5')
    await button(page, 'Add internal note').click()
    const form = page.locator('#ticketArticleReplyForm')
    await expect(form).toBeVisible()
    await page.locator('[id^=internal-]').first().click()
    const editor = page.locator('[role="textbox"]')
    await expect(editor).toBeVisible()
    await editor.pressSequentially('This is an article text...')
    await screenshotOf(form, 'article-creation-note', 5)
    await discardDraft(page)
  })
})
