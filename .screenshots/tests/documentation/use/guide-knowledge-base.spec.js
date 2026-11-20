import { test, expect, loginAs, screenshot, highlight, textIn, withText } from '../../../support/screenshots.js'

test.describe('knowledge base screenshots', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'ADMIN')
  })

  // The KB top bar has two "Additional actions" buttons in the DOM; the second
  // one belongs to the hidden legacy header.
  const openHeaderMenu = async (page) => {
    const buttons = page.locator('button[aria-label="Additional actions"]')
    for (let i = 0; i < (await buttons.count()); i += 1) {
      const rect = await buttons.nth(i).boundingBox()
      if (rect && rect.width > 0 && rect.y >= 0 && rect.y < 200) {
        await buttons.nth(i).click({ force: true })
        await expect(page.locator('[role="menuitem"]').first()).toBeVisible()
        return
      }
    }
    throw new Error('No visible "Additional actions" button in the top bar.')
  }

  const inMain = (page, text) => page.locator('main', { hasText: text }).first()

  // Category 2 is "Products and orders", seeded with two sub-categories and
  // answers.
  const browseCategory = async (page) => {
    await page.goto('/desktop/knowledge-base/locale/en-us/category/2')
    for (const text of ['Products and orders', 'Shipping and delivery', 'Self-service orders', 'Return and exchange policy']) {
      await expect(inMain(page, text)).toBeVisible()
    }
    await expect(page.locator('main [aria-busy="true"]')).toHaveCount(0)
  }

  test('knowledge base full page', async ({ page }) => {
    await browseCategory(page)
    await screenshot(page, 'knowledge-base-full')
  })

  test('category flyout', async ({ page }) => {
    await browseCategory(page)
    // "Edit category" of the first sub-category: the flyout holds the title,
    // icon and parent fields. The icon picker stays closed.
    await page.locator('button[aria-label="Category actions"]').first().click()
    await withText(page, '[role="menuitem"]', 'Edit category').click()
    await expect(page.locator('output[name="categoryIcon"]')).toBeVisible()
    await page.waitForTimeout(500) // flyout transition
    // The flyout panel from the top down to just under the permissions table
    // (+4, so that the rounded row edges stay whole), without the empty
    // stretch above its footer.
    const clip = await page.locator('#flyout-knowledge-base-category').evaluate((flyout) => {
      const table = flyout.querySelector('table')
      if (!table) throw new Error('The flyout has no permissions table.')
      const rect = flyout.getBoundingClientRect()
      const x = Math.floor(rect.left)
      return {
        x,
        y: 0,
        width: Math.ceil(rect.right - x),
        height: Math.ceil(table.getBoundingClientRect().bottom) + 4,
      }
    })
    await screenshot(page, 'kb-category-flyout', clip)
  })

  test('sort content', async ({ page }) => {
    await browseCategory(page)
    await openHeaderMenu(page)
    await withText(page, '[role="menuitem"]', 'Sort content').click()
    // The bar at the bottom with the mode tabs and the two actions.
    const tab = (text) => withText(page, '[role="tab"]', text)
    await expect(tab('Sort alphabetically')).toBeVisible()
    await expect(tab('Categories')).toBeVisible()
    // Both lists stay mounted, the scope tabs switch between them: wait until
    // the category tile is hidden and the answer rows show.
    await tab('Answers').click()
    await expect
      .poll(() =>
        page.evaluate(() =>
          Array.from(document.querySelectorAll('main *'))
            .filter((el) => el.textContent.trim() === 'Self-service orders')
            .every((el) => !el.checkVisibility()),
        ),
      )
      .toBe(true)
    await expect(inMain(page, 'How to track your order')).toBeVisible()
    // Both switches: the scope tabs above the list and the mode tabs in the
    // bottom bar.
    await highlight(tab('Categories').locator('../..'), { padding: 8 })
    await highlight(tab('Sort alphabetically').locator('../..'), { padding: 8 })
    await screenshot(page, 'kb-sort-content')
    // Leave the sorting mode.
    await withText(page, 'button', 'Cancel').click()
  })

  test('scheduled visibility sidebar', async ({ page }) => {
    // Answer 7 is "Delivery times and shipping costs", seeded with a future
    // archived_at, so that the section lists an entry.
    await page.goto('/desktop/knowledge-base/locale/en-us/answer/7/edit')
    await expect(inMain(page, 'Delivery times and shipping costs')).toBeVisible()
    const section = page.locator('#knowledge-base-scheduled-visibility')
    await expect(section).toBeVisible()
    await expect(section.locator('[aria-busy="true"]')).toHaveCount(0)
    // The seeded schedule shows as "Archived — in 3 months".
    await expect(textIn(section, 'Archived')).toBeVisible()
    // "Related tickets" below loads on its own; its "Link ticket" button
    // exists only once that load has settled.
    const linkTicket = page.locator('#kb-related-tickets button[aria-label="Link ticket"]')
    await expect(linkTicket).toBeAttached()
    // The section's wrapper holds its header and the entry list; it has a
    // padding of its own.
    await highlight(section.locator('..'), { padding: 0 })
    // The sidebar panel from the top down to just under the "Link ticket"
    // button.
    const panel = await page.locator('#content-sidebar').boundingBox()
    const button = await linkTicket.boundingBox()
    const x = Math.floor(panel.x)
    await screenshot(page, 'kb-scheduled-visibility', {
      x,
      y: 0,
      width: Math.ceil(panel.x + panel.width - x),
      height: Math.ceil(button.y + button.height) + 30,
    })
  })
})
