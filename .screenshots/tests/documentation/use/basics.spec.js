import {
  test,
  expect,
  loginAs,
  screenshot,
  screenshotOf,
  box,
  union,
  button,
  textIn,
  highlight,
  discardDraft,
  openTicket,
} from '../../../support/screenshots.js'

test.describe('ticket sidebar', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'ADMIN')
  })

  // The reply area of ticket 6 has two states: closed, with an "Add internal
  // note" button next to "or use the reply actions on articles.", and open,
  // with the reply form (and no button). A draft left behind by an earlier test
  // keeps the form open.
  const replyForm = (page) => page.locator('#ticketArticleReplyForm')
  const addInternalNote = (page) => button(page, 'Add internal note')

  const waitForReplyArea = (page) => expect(replyForm(page).or(addInternalNote(page)).first()).toBeAttached()

  const closeReplyFormIfOpen = async (page) => {
    await waitForReplyArea(page)
    if (await replyForm(page).count()) await discardDraft(page)
  }

  const openNoteForm = async (page) => {
    await closeReplyFormIfOpen(page)
    await addInternalNote(page).click()
    await expect(replyForm(page)).toBeVisible()
  }

  test('ticket sidebar', async ({ page }) => {
    await page.goto('/desktop/tickets/6')
    const sidebar = page.locator('#ticketSidebar')
    await expect(textIn(sidebar, 'State')).toBeVisible()
    await expect(textIn(sidebar, 'Owner')).toBeVisible()
    // Every section of the sidebar shows a skeleton until its data arrives.
    for (const id of ['ticket-attributes', 'ticket-links', 'ticket-ai-knowledge-base-answers', 'ticket-subscribers']) {
      await expect(page.locator(`[id="${id}"]`)).toBeAttached()
      await expect(page.locator(`[id="${id}"] [aria-busy="true"]`)).toHaveCount(0)
    }
    const subscribers = page.locator('[id="ticket-subscribers"]')
    await expect(subscribers).toBeVisible()
    await screenshot(page, 'ticket-sidebar', await union(await box(page.locator('[aria-label="Ticket"]'), 10), await box(subscribers, 10)))
  })

  test('ticket create', async ({ page }) => {
    await page.goto('/desktop/tickets/create')
    // Before the attribute fields show, the form is still loading.
    await expect(page.locator('main label', { hasText: 'Group' }).first()).toBeVisible()
    await expect(page.locator('main label', { hasText: 'State' }).first()).toBeVisible()
    await expect(page.locator('a[aria-label="New ticket"]')).toBeVisible()
    await highlight(page.locator('[id="ticket-create"]'))
    await highlight(page.locator('a[aria-label="New ticket"]'))
    await screenshot(page, 'ticket-create')
  })

  test('article type visibility', async ({ page }) => {
    await page.goto('/desktop/tickets/6')
    await waitForReplyArea(page)
    if (!(await replyForm(page).count())) await addInternalNote(page).click()
    const form = replyForm(page)
    await expect(form).toBeVisible()
    await form.scrollIntoViewIfNeeded()
    // The visibility switch and its "Internal" label.
    await highlight(form.locator('[role="switch"]').locator('..'), { padding: 8 })
    await screenshotOf(form, 'article-type-visibility')
    await discardDraft(page)
  })

  test('new article', async ({ page }) => {
    await page.goto('/desktop/tickets/6')
    await closeReplyFormIfOpen(page)
    const hint = textIn(page.locator('span'), 'or use the reply actions on articles.').locator('..')
    await expect(hint).toBeVisible()
    await screenshot(page, 'new-article', await union(await box(addInternalNote(page), 5), await box(hint, 5)))
  })

  test('article reply', async ({ page }) => {
    // Clicking before the view has settled opens the wrong menu.
    await openTicket(page, 4)
    const actionMenu = page.locator('[aria-label="Action menu button"]').first()
    await actionMenu.click()
    const actions = actionMenu.locator('../..')
    const menu = page.locator('[role="menu"]').last()
    await expect(menu).toBeVisible()
    await highlight(actions)
    await screenshot(
      page,
      'article-reply',
      await union(
        await box(actions, 5),
        await box(page.locator('[data-test-id="article-bubble-container-8"]'), 5),
        await box(menu, 5),
      ),
    )
  })

  test('article reply pinned', async ({ page }) => {
    await page.goto('/desktop/tickets/6')
    await openNoteForm(page)
    await page.locator('button[aria-label="Pin this panel"]').click({ force: true })
    const resize = page.locator('button[aria-label="Resize article panel"]')
    await resize.click({ force: true })
    // About 460px: 34 steps of 5px on top of the default 290px.
    for (let i = 0; i < 34; i += 1) await resize.press('ArrowUp')
    await expect(page.locator('div[style*="height"]', { has: replyForm(page) }).last()).toHaveAttribute(
      'style',
      /height: 460px/,
    )
    await page.locator('[aria-label="Scroll to start"]').click({ force: true })
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
    // The floating toolbar has its real buttons, not a skeleton.
    await expect(page.locator('[aria-label="Scroll to end"]')).toBeVisible()
    await expect(page.locator('main [aria-busy="true"]')).toHaveCount(0)
    await highlight(page.locator('button[aria-label="Unpin this panel"]'))
    await screenshot(page, 'article-reply-pinned')
    await closeReplyFormIfOpen(page)
  })

  test('copy ticket number button', async ({ page }) => {
    await page.goto('/desktop/tickets/4')
    const breadcrumb = page.locator('[aria-label="Breadcrumb navigation"]')
    await highlight(breadcrumb.locator('[aria-label="Copy ticket number"]'))
    await screenshot(
      page,
      'copy-ticket-number-button',
      await union(await box(breadcrumb, 10), await box(page.locator('[aria-label="Open checklist"]'), 10)),
    )
  })
})
