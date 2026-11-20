import { test, expect, loginAs, screenshot, box, remeasure, textIn, textMatch } from '../../../support/screenshots.js'

test.describe('caller log screenshots', () => {
  // The navigation; the caller log table shows the numbers of ringing calls,
  // too, so every check of the navigation is scoped to it.
  const sidebar = (page) => page.locator('nav')

  // The caller notification switch of the Phone entry. The navigation has
  // other switches (BETA UI, chat availability).
  const callerNotificationSwitch = (page) =>
    textIn(sidebar(page), 'Caller notification')
      .locator('xpath=ancestor-or-self::li[1]')
      .locator('button[role="switch"]')

  // The caller notification is a per-user preference of the account every test
  // logs in with, and the "switched off" shot flips it. The switch updates
  // optimistically, so read the stored value back and retry until the server
  // agrees. Running this before each test also repairs a stack an earlier run
  // left dirty.
  const callerNotificationOnServer = async (page) => {
    const response = await page.request.post('/graphql', {
      data: { query: 'query { currentUser { personalSettings { callerNotificationEnabled } } }' },
    })
    const body = await response.json()
    if (!body.data) throw new Error(`caller notification query failed: ${JSON.stringify(body)}`)
    return body.data.currentUser.personalSettings.callerNotificationEnabled
  }

  const ensureCallerNotification = async (page, enabled) => {
    for (let round = 0; round < 3; round += 1) {
      if ((await callerNotificationOnServer(page)) === enabled) return
      await page.goto('/desktop/cti')
      await callerNotificationSwitch(page).click()
      await page.waitForTimeout(2000) // let the mutation land
    }
    expect(await callerNotificationOnServer(page), 'caller notification could not be brought to the wanted state').toBe(enabled)
  }

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'ADMIN')
    await ensureCallerNotification(page, true)
  })

  // Restores the notification after the test that turns it off, even when it
  // fails: a leaked "off" empties the navigation for every later shot.
  test.afterEach(async ({ page }) => {
    await ensureCallerNotification(page, true)
  })

  // The navigation and the table show skeletons while the query is in flight.
  const waitForCallerLog = async (page) => {
    await expect(page.locator('table tbody tr').first()).toBeVisible()
    await expect(page.locator('table [aria-busy="true"]')).toHaveCount(0)
    await expect(page.locator('table tbody tr').first()).toHaveText(/\S.{9,}/)
  }

  test('caller log full page', async ({ page }) => {
    await page.goto('/desktop/cti')
    await waitForCallerLog(page)
    await screenshot(page, 'caller-log-full')
  })

  test('caller log table with caller matches', async ({ page }) => {
    await page.goto('/desktop/cti')
    await waitForCallerLog(page)
    // In the full page shot, the rows are too small to show the Maybe badge,
    // the additional matches badge and the unknown caller avatar.
    await screenshot(page, 'caller-log-table', await box(page.locator('table'), 10))
  })

  test('call notifications switched off in the navigation sidebar', async ({ page }) => {
    await page.goto('/desktop/cti')
    await waitForCallerLog(page)
    await expect(textIn(sidebar(page), 'Phone')).toBeVisible()
    await expect(textIn(sidebar(page), 'unhandled calls')).toBeVisible()

    await callerNotificationSwitch(page).click()
    await expect(callerNotificationSwitch(page)).toHaveAttribute('aria-checked', 'false')
    await expect(sidebar(page).getByText(textMatch('unhandled calls'))).toHaveCount(0)
    await expect(sidebar(page).getByText(textMatch('123456789'))).toHaveCount(0)

    // The Phone entry only. The switched-on shot covers it plus the ringing
    // calls below it, so the two together show what the switch takes away.
    const phone = textIn(sidebar(page), 'Phone').locator('xpath=ancestor-or-self::li[1]')
    await screenshot(page, 'sidebar-notifications-off', await box(phone, 10))
  })

  test('ringing call in the navigation sidebar', async ({ page }) => {
    await page.goto('/desktop/cti')
    await waitForCallerLog(page)
    // The Phone entry needs a configured telephony backend; its counter and
    // the ringing calls show only while the caller notification is on. The
    // seeded calls (a known customer and an unknown number) come last.
    for (const text of ['Phone', 'unhandled calls', '55571630', '123456789']) {
      await expect(textIn(sidebar(page), text)).toBeVisible()
    }

    // From the top of the Phone entry down to the row of the unknown caller,
    // which sits in a nested list inside the Phone entry.
    const ringing = textIn(sidebar(page), '123456789')
    const [row, phone] = await remeasure(
      await box(ringing.locator('xpath=ancestor-or-self::li[1]')),
      await box(ringing.locator('xpath=ancestor::li[last()]')),
    )
    const padding = 10
    await screenshot(page, 'sidebar-ringing-call', {
      x: phone.x - padding,
      y: phone.y - padding,
      width: phone.width + padding * 2,
      height: row.y + row.height - phone.y + padding,
    })
  })
})
