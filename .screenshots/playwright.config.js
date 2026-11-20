import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  // The tests share one Zammad stack, and some of them change the tickets that
  // others take screenshots of (merge, split, tags, bulk actions). Run them one
  // after another, in file order.
  workers: 1,
  fullyParallel: false,
  retries: 0,
  timeout: 120_000,
  expect: { timeout: 20_000 },
  reporter: process.env.CI ? [['list']] : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.SCREENSHOTS_BASE_URL || 'http://localhost:8080',
    // Chromium, which the UI mode of `pnpm dev` needs anyway. Headless, it
    // draws no scrollbars and has no spell checker, so neither shows in the
    // screenshots.
    browserName: 'chromium',
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    // The tests and the seeded content are English.
    locale: 'en-US',
    actionTimeout: 20_000,
    navigationTimeout: 30_000,
    trace: 'retain-on-failure',
  },
})
