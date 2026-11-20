import {
  test,
  expect,
  loginAs,
  screenshot,
  screenshotOf,
  box,
  button,
  textIn,
  highlight,
  discardDraft,
  openTicket,
} from '../../../support/screenshots.js'

test.describe('Secure Email', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'ADMIN')
  })

  const openReply = async (page, text) => {
    await openTicket(page, 7)
    // A click on "Reply" right after the ticket has loaded can leave the reply
    // form hidden (see guide-ai.spec.js): click again until its editor shows.
    // "Reply" is in the action menu of the article, which closes on a click.
    const editor = page.locator("[contenteditable='true']")
    await expect(async () => {
      if (!(await editor.isVisible())) {
        await page.locator('[aria-label="Action menu button"]').first().click({ force: true })
        await button(page, 'Reply').click({ timeout: 5_000 })
      }
      await expect(editor).toBeVisible({ timeout: 5_000 })
    }).toPass({ timeout: 30_000 })
    await editor.focus()
    await page.keyboard.type(text)
    return editor
  }

  // Incoming decrypted and verified email.
  test('encryption and signing icons', async ({ page }) => {
    await openTicket(page, 7)
    const encrypted = page.locator('svg[aria-label="Encrypted"]').first()
    await expect(encrypted).toBeVisible()
    await screenshotOf(encrypted, 'secure-email-encrypted', 5)
    await screenshotOf(page.locator('svg[aria-label="Signed"]').first(), 'secure-email-signed', 5)

    await page.locator('[data-test-id^="article-bubble-body-"]').first().click()
    await highlight(textIn(page, 'PGP').locator('..'), { padding: 5 })
    await screenshotOf(page.locator('[data-test-id^="article-bubble-container-"]').first(), 'secure-email-incoming-article', 10)
  })

  test('outgoing email signing only', async ({ page }) => {
    const editor = await openReply(page, 'This reply just gets signed.')
    await button(page, 'Encrypt').click()
    await editor.click()
    await screenshotOf(page.locator('[id^="ticketArticleReplyForm"]'), 'secure-email-signing-only', 10)
    await discardDraft(page)
  })

  // Editor: Encrypt and Sign buttons of a new outgoing email.
  test('outgoing email with encryption and signing', async ({ page }) => {
    await openReply(page, 'This is a reply for an encrypted and signed email.')
    const form = page.locator('[id^="ticketArticleReplyForm"]')
    await highlight(form.locator('[role="listbox"]'), { padding: 8 })
    await screenshotOf(form, 'secure-email-outgoing-article', 10)
    await discardDraft(page)
  })

  // Error states: the warning banner and the individual fail icons.
  test('security error indicators on ticket articles', async ({ page }) => {
    await openTicket(page, 7)
    const article = page.locator('[data-test-id^="article-bubble-container-"]', {
      has: page.locator('h2', { hasText: 'Security error' }),
    }).first()
    await expect(article).toBeVisible()
    await screenshotOf(article, 'secure-email-error-banner', 10)

    await article.locator('[data-test-id^="article-bubble-body-"]').click()
    const notEncrypted = page.locator('svg.icon-encryption-fail').first()
    await expect(notEncrypted).toBeVisible()
    await screenshot(page, 'secure-email-not-encrypted', await box(notEncrypted, 3))
    const notSigned = page.locator('svg.icon-signing-fail').first()
    await expect(notSigned).toBeVisible()
    await screenshot(page, 'secure-email-not-signed', await box(notSigned, 3))
  })
})
