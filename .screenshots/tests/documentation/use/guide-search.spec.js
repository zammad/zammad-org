import { test, expect, loginAs, screenshot, box, union, textIn } from '../../../support/screenshots.js'

test.describe('search screenshots', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'ADMIN')
  })

  test('search', async ({ page }) => {
    await page.goto('/desktop/tickets/1')
    const search = page.locator('[aria-label="Search…"]')
    await search.click()
    await search.pressSequentially('fast')
    // Without Elasticsearch, the database search finds the organization by
    // its own name only.
    const organization = page.locator('[id="Organization-2"]')
    await expect(organization).toBeVisible({ timeout: 60_000 })
    await screenshot(page, 'search-sidebar', await union(await box(page.locator('header')), await box(organization, 5)))
  })

  test('detailed search', async ({ page }) => {
    await page.goto('/desktop/search/supp?entity=Ticket&filter.0.name=ticket.state_id&filter.0.operator=is&filter.0.value[0]=5&filter.0.value[1]=1&filter.0.value[2]=2&filter.1.name=ticket.last_contact_agent_at&filter.1.operator=within+last+(relative)&filter.1.value=7&filter.1.range=day')
    await expect(textIn(page.locator('label'), 'State')).toBeVisible()
    // The title cell renders through TicketPopoverWithTrigger, which carries no
    // title aria-label: anchor on the title column.
    await expect(
      page.locator('td[headers="title-header"]', { hasText: 'Laptop not working [Order 931529477]' }),
    ).toBeVisible({ timeout: 60_000 })
    await screenshot(
      page,
      'search-detail',
      await union(await box(page.locator('[aria-label="Breadcrumb navigation"]'), 10), await box(page.locator('table'), 10)),
    )
  })
})
