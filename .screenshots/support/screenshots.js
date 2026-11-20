// Shared helpers of the screenshot tests: the test fixture, logging in, and
// taking, cropping and decorating screenshots.

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { test as base, expect } from '@playwright/test'

const root = fileURLToPath(new URL('..', import.meta.url))
const testDir = path.join(root, 'tests')

// Relative to `.screenshots/`. CI writes to `dist/generated` and copies the
// result out of the runner container, see zammad-stack/screenshots.sh.
const outputDir = path.resolve(
  root,
  process.env.SCREENSHOTS_DIR || '../src/public/screenshots/generated',
)

// The accounts of the seeded system, see zammad-stack/seeds/auto_wizard.json.
export const users = {
  ADMIN: { login: 'lauren@fastlane.inc', password: 'lauren4711' },
  AGENT1: { login: 'liam@fastlane.inc', password: 'liam4711' },
  AGENT2: { login: 'morgan@fastlane.inc', password: 'morgan4711' },
}

export const test = base.extend({
  context: async ({ context }, use) => {
    // The disclaimer of the new desktop UI would cover every page.
    await context.addInitScript(() => {
      try {
        window.localStorage.setItem('beta-ui-disclaimer', 'true')
      } catch {
        // No storage on about:blank.
      }
    })
    await use(context)
  },
})

export { expect }

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// Case-sensitive text match.
export const textMatch = (text) => new RegExp(escapeRegExp(text))

// The innermost element below `scope` (or `scope` itself) that contains
// `text`. For a button, that is usually its label <span>.
export const textIn = (scope, text) => scope.getByText(textMatch(text)).first()

// The first element matching `selector` that contains `text`.
export const withText = (scope, selector, text) =>
  scope.locator(selector, { hasText: textMatch(text) }).first()

export const button = (scope, text) => withText(scope, 'button', text)

export async function loginAs(page, user = 'ADMIN', recoveryCode = null) {
  const account = users[user]
  if (!account) throw new Error(`loginAs: unknown user "${user}", use one of ${Object.keys(users)}`)

  // Logging out first also covers tests that switch users.
  await page.goto('/desktop/logout')
  await expect(page).toHaveURL(/\/desktop\/login$/)
  await page.locator('[name="login"]').fill(account.login)
  await page.locator('[name="password"]').fill(account.password)
  await button(page, 'Sign in').click()
  if (recoveryCode) {
    await withText(page, 'a', 'Try another method').click()
    await withText(page, 'a', 'Or use one of your recovery codes.').click()
    await page.locator('[name="code"]').fill(recoveryCode)
    await button(page, 'Sign in').click()
  }
  await expect(page).not.toHaveURL(/\/desktop\/login/)
}

// Throws the draft of the open reply form away, so that it does not show up in
// later tests.
export async function discardDraft(page) {
  await button(page, 'Discard your unsaved changes').click()
  await button(page, 'Discard changes').click()
}

// `<directory>/<spec>/<name>.png`, e.g. `documentation/use/basics/foo.png`
// for the screenshot `foo` of `tests/documentation/use/basics.spec.js`. The
// documentation refers to the screenshots by these paths, inside translatable
// strings: renaming a spec or a screenshot changes them.
export function screenshotPath(name) {
  const spec = path.relative(testDir, test.info().file).replace(/\.spec\.js$/, '')
  return path.join(outputDir, spec, `${name}.png`)
}

// A screenshot of the viewport, or of the `clip` part of it. Running CSS
// transitions are finished first, so that no popover is caught fading in.
export async function screenshot(page, name, clip) {
  await page.screenshot({
    path: screenshotPath(name),
    animations: 'disabled',
    clip: clip && {
      x: Math.round(clip.x),
      y: Math.round(clip.y),
      width: Math.round(clip.width),
      height: Math.round(clip.height),
    },
  })
}

const paddings = (padding) => {
  if (!Array.isArray(padding)) return [padding, padding, padding, padding]
  // CSS order: top, right, bottom, left.
  const [top, right = top, bottom = top, left = right] = padding
  return [top, right, bottom, left]
}

const inViewport = (page, rect) => {
  const { width, height } = page.viewportSize()
  return rect.x >= 0 && rect.y >= 0 && rect.x + rect.width <= width && rect.y + rect.height <= height
}

// The rectangle of an element in the viewport (the first one, if the locator
// matches several), plus `padding` (a number or a CSS-like [top, right,
// bottom, left] list). Scrolls the element into view first. Screenshots trim
// the rectangle to the viewport.
export async function box(element, padding = 0) {
  const locator = element.first()
  await locator.scrollIntoViewIfNeeded()
  const [top, right, bottom, left] = paddings(padding)
  // Without scrolling, so that remeasure() can measure again, see there.
  const measure = async () => {
    const rect = await locator.boundingBox()
    if (!rect) throw new Error(`${locator} has no box`)
    return {
      x: rect.x - left,
      y: rect.y - top,
      width: rect.width + left + right,
      height: rect.height + top + bottom,
      locator,
      inViewport: inViewport(locator.page(), rect),
      measure,
    }
  }
  return measure()
}

// The given boxes, measured again in the current scroll position. Each box()
// scrolls its element into view, which can move the elements of the boxes
// taken before it: combine boxes only after measuring them again. Fails if an
// element that was in the viewport has been scrolled out of it, as the
// elements then do not fit into one screenshot.
export function remeasure(...boxes) {
  return Promise.all(
    boxes.map(async (before) => {
      const after = await before.measure()
      if (before.inViewport && !after.inViewport) {
        throw new Error(`${after.locator} was scrolled out of the viewport by another box`)
      }
      return after
    }),
  )
}

// The smallest rectangle around all given boxes.
export async function union(...boxes) {
  const clips = await remeasure(...boxes)
  const xMin = Math.min(...clips.map((c) => c.x))
  const yMin = Math.min(...clips.map((c) => c.y))
  const xMax = Math.max(...clips.map((c) => c.x + c.width))
  const yMax = Math.max(...clips.map((c) => c.y + c.height))
  return { x: xMin, y: yMin, width: xMax - xMin, height: yMax - yMin }
}

// A screenshot of an element, plus `padding`.
export async function screenshotOf(locator, name, padding = 0) {
  await screenshot(locator.page(), name, await box(locator, padding))
}

// Frames an element (the first one, if the locator matches several) with the
// gradient border of the documentation.
export async function highlight(element, { border = 4, padding = 10 } = {}) {
  const locator = element.first()
  await locator.waitFor({ state: 'visible' })
  await locator.evaluate(
    async (el, { border, padding }) => {
      // Elements in fixed containers (popovers) do not move with the document:
      // the overlay is fixed there, and absolute everywhere else.
      let isFixed = false
      for (let node = el; node && node !== document.body; node = node.parentElement) {
        if (getComputedStyle(node).position === 'fixed') {
          isFixed = true
          break
        }
      }
      const measure = () => {
        const rect = el.getBoundingClientRect()
        return {
          left: isFixed ? rect.left : rect.left + window.scrollX,
          top: isFixed ? rect.top : rect.top + window.scrollY,
          width: rect.width,
          height: rect.height,
        }
      }

      // Late layout shifts would leave the overlay behind: wait until two
      // measurements in a row agree.
      let previous = null
      let current = measure()
      for (let attempt = 0; attempt < 40; attempt += 1) {
        if (previous && Object.keys(current).every((key) => Math.abs(current[key] - previous[key]) < 0.5)) break
        await new Promise((resolve) => setTimeout(resolve, 100))
        previous = current
        current = measure()
      }

      const overlay = document.createElement('div')
      Object.assign(overlay.style, {
        position: isFixed ? 'fixed' : 'absolute',
        zIndex: '10000',
        pointerEvents: 'none',
        width: `${current.width + padding * 2}px`,
        height: `${current.height + padding * 2}px`,
        left: `${current.left - padding}px`,
        top: `${current.top - padding}px`,
        borderWidth: `${border}px`,
        borderStyle: 'solid',
        borderImageSlice: '1',
        borderImageSource: 'linear-gradient(270deg, #ffce33 30%, #e54011)',
      })
      document.body.append(overlay)
    },
    { border, padding },
  )
}

// Waits for the GraphQL response that carries `key` in its data.
export function waitForGqlResponse(page, key) {
  return page.waitForResponse(async (response) => {
    if (!response.url().endsWith('/graphql')) return false
    const body = await response.json().catch(() => null)
    const answers = Array.isArray(body) ? body : [body]
    return answers.some((answer) => answer?.data && key in answer.data)
  })
}

// Closes the taskbar tab with the given title.
export async function closeTab(page, title) {
  await withText(page, 'li.group\\/tab', title).locator('button').click({ force: true })
}

// Opens a ticket and waits until its articles have rendered and nothing in the
// main area is loading any more.
export async function openTicket(page, id) {
  await page.goto(`/desktop/tickets/${id}`)
  await expect(page.locator('[data-test-id^="article-bubble-container-"]').first()).toBeVisible()
  await expect(page.locator('main [aria-busy="true"]')).toHaveCount(0)
}
