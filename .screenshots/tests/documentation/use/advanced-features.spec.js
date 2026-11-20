import {
  test,
  expect,
  loginAs,
  screenshot,
  screenshotOf,
  box,
  union,
  remeasure,
  button,
  textIn,
  highlight,
  discardDraft,
  openTicket,
} from '../../../support/screenshots.js'

const transition = (page) => page.waitForTimeout(500)

test.describe('usage advanced features', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'ADMIN')
  })

  // Opens the internal note form of ticket 7, unless a draft of an earlier,
  // interrupted run keeps it open already, and types into it.
  const typeNote = async (page, text) => {
    await openTicket(page, 7)
    const form = page.locator('#ticketArticleReplyForm')
    await expect(form.or(button(page, 'Add internal note')).first()).toBeAttached()
    if (!(await form.count())) await button(page, 'Add internal note').click()
    await expect(form).toBeVisible()
    await transition(page)
    await textIn(page.locator('label'), 'Text').click()
    await page.keyboard.type(text)
    return form
  }

  // Types a command into the editor and highlights its toolbar button
  // (`label`), once the suggestion list of the command shows `suggestion`.
  const editorPopover = async (page, text, label, suggestion, name) => {
    const form = await typeNote(page, text)
    const action = page.locator(`[aria-label="${label}"]`)
    await expect(action).toBeVisible()
    await expect(page.getByRole('listbox').filter({ hasText: suggestion })).toBeVisible()
    await highlight(action)
    await screenshotOf(form, name, [10, 0, 0, 0])
    await discardDraft(page)
  }

  test('ticket article mention', async ({ page }) => {
    await editorPopover(page, 'Hello @@et', 'Mention user', 'Ethan Kwan', 'ticket-article-mention')
  })

  test('ticket article kba', async ({ page }) => {
    // No answers before a search term, only the hint to type one.
    await editorPopover(
      page,
      '??',
      'Insert knowledge base answer',
      'Start typing to search in knowledge base',
      'ticket-article-insert-kba',
    )
  })

  test('ticket article text template', async ({ page }) => {
    await editorPopover(page, '::mr', 'Insert text from text module', 'Dear Mr.', 'ticket-article-text-template')
  })

  test('ticket subscribe', async ({ page }) => {
    await openTicket(page, 7)
    await page.locator('#ticket-attributes-header').click()
    await transition(page)
    await textIn(page.locator('label'), 'Subscribe me').click()
    // The subscriber list shows the change: an avatar (initials with an
    // "Avatar (…)" label, no <img>) below the switch.
    const subscribers = page.locator('#ticket-subscribers')
    await expect(subscribers.locator('[aria-label^="Avatar"]').first()).toBeVisible()
    await screenshotOf(subscribers.locator('..'), 'ticket-subscribe', 5)
    await textIn(page.locator('label'), 'Subscribe me').click()
  })

  test('ticket macro', async ({ page }) => {
    await openTicket(page, 7)
    const macros = page.locator('[aria-label="Drafts & macros"]')
    await macros.click()
    const popover = page.locator('div.popover.fixed')
    await expect(popover).toBeVisible()
    await transition(page)
    await screenshot(page, 'ticket-macro', await union(await box(popover, 5), await box(macros, 5)))
  })

  test('ticket behavior update', async ({ page }) => {
    await openTicket(page, 7)
    const stayOnTab = button(page, 'Stay on tab')
    await stayOnTab.click()
    const popover = page.locator('div.popover.fixed')
    await expect(popover).toBeVisible()
    await transition(page)
    await screenshot(page, 'ticket-behavior-update', await union(await box(popover, 5), await box(stayOnTab, 5)))
  })

  test('ticket tags', async ({ page }) => {
    await openTicket(page, 6)
    const tags = page.locator('#ticket-tags')
    await expect(tags.locator('[aria-label="Remove this tag"]').first()).toBeAttached()
    await screenshotOf(tags.locator('..'), 'ticket-tags', 5)
  })

  test('ticket checklist', async ({ page }) => {
    await openTicket(page, 4)
    await page.locator('[aria-label="Checklist"]').click()
    const add = page.locator('[aria-label="Create a new checklist item"]')
    await expect(add).toBeVisible()
    await transition(page)
    await screenshot(page, 'ticket-checklist', await union(await box(page.locator('#checklistTitle').locator('..'), 5), await box(add, 5)))
  })

  test('ticket merge', async ({ page }) => {
    await openTicket(page, 5)
    await page.locator('#content-sidebar [id^=action-menu-]').click()
    await button(page, 'Merge').click()
    // The flyout lists the recent tickets of the customer.
    const flyout = page.locator('[id="flyout-ticket-merge"]')
    await expect(flyout.locator('table tbody tr').first()).toBeVisible()
    await expect(flyout.locator('[aria-busy="true"]')).toHaveCount(0)
    await transition(page)
    await screenshot(page, 'ticket-merge', await union(await box(flyout.locator('header')), await box(page.locator('table'))))
  })

  test('ticket split', async ({ page }) => {
    await openTicket(page, 5)
    const actionMenu = page.locator('main [id^=action-menu-]')
    await actionMenu.click()
    const popover = page.locator('[id^="popover-"]')
    await expect(popover).toBeVisible()
    await transition(page)
    await screenshot(page, 'ticket-split', await union(await box(popover, 5), await box(actionMenu, 5)))
  })

  test('time accounting', async ({ page }) => {
    await typeNote(page, 'test')
    await button(page, 'Update').click()
    const title = page.locator('[id="flyout-ticket-time-accounting-title"]')
    await expect(title).toBeVisible()
    await page.locator('[id="timeUnit"]').click()
    await page.keyboard.type('1.5')
    const type = page.locator('[id="accountedTimeTypeId"]')
    await type.click()
    // Pick the second activity type once the options show; keys pressed
    // earlier get lost and leave the type empty.
    await expect(page.getByRole('option').first()).toBeVisible()
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await title.click()
    await screenshot(page, 'time-accounting-dialog', await union(await box(title.locator('..')), await box(type, 5)))
    await button(page, 'Account time').click()
    await screenshotOf(page.locator('[id="ticket-time-accounting-header"]').locator('..'), 'time-accounting-overview', 5)
  })

  // Selects the first entry of the overview twice: the first click selects the
  // first ticket, the second one the next first entry.
  const selectEntries = async (page) => {
    await page.goto('/desktop/tickets/view/open-group')
    await page.locator('[aria-label="Select this entry"]').first().click()
    await page.locator('[aria-label="Select this entry"]').first().click()
    await page.waitForTimeout(300)
  }

  // Picks the first option of a select field that matches `search`.
  const pick = async (page, label, search) => {
    await textIn(page.locator('label'), label).click({ force: true })
    await page.waitForTimeout(300)
    await page.keyboard.type(search)
    await page.waitForTimeout(300)
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.waitForTimeout(300)
  }

  test('bulk action overview side panel', async ({ page }) => {
    await selectEntries(page)
    await button(page, 'Bulk actions').click()
    const flyout = page.locator('[id="flyout-tickets-bulk-edit"]')
    await expect(flyout).toBeVisible()
    await page.waitForTimeout(1000) // flyout transition
    // A narrower panel makes for a smaller screenshot.
    const resize = page.locator('[aria-label="Resize side panel"]')
    await resize.focus()
    for (let i = 0; i < 54; i += 1) await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(300)
    await pick(page, 'Group', 'Infrastructure')
    await pick(page, 'Owner', 'Jackson')
    await textIn(page.locator('label'), 'Note').click()
    await page.locator('[name="body"]').click()
    await page.keyboard.type('Hi Jackson, can you please take care of these tickets? Thanks!')
    await screenshot(
      page,
      'bulk-side-panel-overviews',
      await union(await box(flyout.locator('header')), await box(page.locator('[name="internal"]'), 5)),
    )
  })

  test('bulk action overview drag and drop ', async ({ page }) => {
    await selectEntries(page)
    // Starts dragging the selected tickets with synthetic mouse events, which
    // the overview takes for a drag; a real mouse would start a native drag of
    // the link instead.
    const link = page.locator('[href="/desktop/tickets/8"]').first()
    const rect = await link.boundingBox()
    await link.dispatchEvent('mousedown', {
      button: 0,
      buttons: 1,
      clientX: rect.x + rect.width / 2,
      clientY: rect.y + rect.height / 2,
    })
    await page.waitForTimeout(300)
    await page.evaluate(() => {
      for (const [clientX, clientY] of [[0, 0], [960, 750]]) {
        document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX, clientY, buttons: 1 }))
      }
    })
    await page.waitForTimeout(2000)
    await screenshot(page, 'bulk-action-drag-and-drop')
  })

  test('user popover', async ({ page }) => {
    await openTicket(page, 3)
    // From the avatar of an article: the one in the ticket header was not
    // reliable.
    await page.locator('[aria-label="Avatar (Evelyn Smith) (VIP)"]').last().dispatchEvent('mouseenter')
    const popover = page.locator('.popover').filter({ visible: true }).first()
    await expect(popover).toBeVisible()
    await page.waitForTimeout(1000) // transition
    await screenshotOf(popover, 'user-detail-panel', [57, 0, 5, 15])
  })

  test('gitlab sidebar tab with linked issue', async ({ page }) => {
    // The stack has no GitLab token, so the linked issue is made up: the
    // ticket gains one GitLab link, and the list of linked issues is replaced.
    const linkedIssue = {
      __typename: 'TicketExternalReferencesIssueTrackerItem',
      assignees: ['Evelyn Smith'],
      issueId: 583,
      issueType: {
        __typename: 'TicketExternalReferencesIssueTrackerItemIssueType',
        color: 'BLUE',
        name: 'Documentation',
      },
      labels: [
        {
          __typename: 'TicketExternalReferencesIssueTrackerItemLabel',
          color: '#009966',
          textColor: '#FFFFFF',
          title: 'docs',
        },
      ],
      milestone: '7.4',
      state: 'open',
      title: 'Overhaul GitHub & GitLab page',
      url: 'https://git.zammad.com/zammad/zammad/-/issues/583',
    }
    await page.route('**/graphql', async (route) => {
      const request = route.request().postDataJSON()
      const requests = Array.isArray(request) ? request : [request]
      const response = await route.fetch()
      const body = await response.json()
      const answers = Array.isArray(body) ? body : [body]
      answers.forEach((answer, i) => {
        if (requests[i]?.operationName === 'ticketExternalReferencesIssueTrackerItemList') {
          answer.data = { ticketExternalReferencesIssueTrackerItemList: [linkedIssue] }
          delete answer.errors
          return
        }
        if (!answer?.data) return
        Object.values(answer.data).forEach((node) => {
          if (node && typeof node === 'object' && 'externalReferences' in node) {
            node.externalReferences = { github: null, gitlab: [linkedIssue.url] }
          }
        })
      })
      await route.fulfill({ response, json: body })
    })
    await openTicket(page, 6)
    await page.locator('[aria-label="GitLab"]').click()
    const issue = page.getByText('#583 Overhaul GitHub & GitLab page')
    await expect(issue).toBeVisible()
    // The side panel down to the bottom of the linked issue, without the empty
    // part below it.
    const [item, panel] = await remeasure(
      await box(issue.locator('xpath=ancestor-or-self::div[contains(concat(" ", @class, " "), " group ") and contains(concat(" ", @class, " "), " flex ") and contains(concat(" ", @class, " "), " gap-2 ")][1]')),
      await box(page.locator('#content-sidebar'), 5),
    )
    await screenshot(page, 'gitlab-sidebar-linked-issue', { ...panel, height: item.y + item.height + 5 - panel.y })
  })

  // The detail pages of a user and an organization: the header down to the
  // ticket statistics.
  for (const [name, path] of [
    ['user-detail-page', '/desktop/users/10'],
    ['organization-detail-page', '/desktop/organizations/2'],
  ]) {
    test(name.replace(/-/g, ' '), async ({ page }) => {
      await page.goto(path)
      const chart = page.locator(
        '[aria-label="Bar chart showing ticket statistics. Created and closed tickets over the last 12 months."]',
      )
      await expect(chart).toBeVisible()
      await page.waitForTimeout(1000) // chart transition
      await screenshot(page, name, await union(await box(page.locator('div.mx-auto.mt-3.flex.w-full.max-w-278'), 10), await box(chart)))
    })
  }

  test('escalation-panel', async ({ page }) => {
    await openTicket(page, 3)
    const escalation = page.locator('[aria-label="Show ticket escalation information"]').first()
    await escalation.dispatchEvent('mouseenter')
    const popover = page.locator('.popover').filter({ visible: true }).first()
    await expect(popover).toBeVisible()
    await page.waitForTimeout(1000) // transition
    await screenshot(page, 'escalation-panel', await union(await box(escalation, 5), await box(popover, 5)))
  })

  test('duplicate detection', async ({ page }) => {
    // Petra Parker (ID 16), given in the URL: typing into the customer field
    // was unreliable.
    await page.goto('/desktop/tickets/create?customer_id=16')
    // The warning shows once the check for similar tickets has finished.
    await expect(page.getByText('Similar tickets found')).toBeVisible()
    await screenshot(
      page,
      'duplicate-detection',
      await union(
        await box(textIn(page.locator('h1'), 'New ticket'), 12),
        await box(textIn(page.locator('label'), 'Customer').locator('..'), 12),
      ),
    )
  })

  test('text highlighting', async ({ page }) => {
    await openTicket(page, 4)
    const options = page.locator('[aria-label="Highlight options"]').last()
    await options.click()
    // The popover and its menu carry the same data-id.
    const popover = page.locator('[data-id="highlight-menu-popover"]').first()
    await expect(popover).toBeVisible()
    await screenshot(page, 'text-highlighting', await union(await box(options, 5), await box(popover, 5)))
  })
})
