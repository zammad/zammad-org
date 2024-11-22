const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    env: {
      ADMIN_LOGIN: 'admin@example.com',
      ADMIN_PASS: 'test',
      AGENT1_LOGIN: 'agent1@example.com',
      AGENT1_PASS: 'test',
    },
    defaultCommandTimeout: 20000,
    supportFolder: 'cypress/support',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: '../src/public/screenshots/cypress',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: false, // will be activated within a test run
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          // fullPage screenshot size is 1280x859 on non-retina screens
          // once the browser chrome is removed, screenshot will be cropped to 1280x720
          launchOptions.args.push('--window-size=1280,859')

          // force screen to be non-retina (1280x720 size)
          launchOptions.args.push('--force-device-scale-factor=1')
        }

        if (browser.name === 'electron' && browser.isHeadless) {
          // fullPage screenshot size is 1280x720
          // on retina screens, this will always be double the size
          // there is currently no known way to automatically scale this down!
          launchOptions.preferences.width = 1280
          launchOptions.preferences.height = 720
        }

        if (browser.name === 'firefox' && browser.isHeadless) {
          // menubars take up height of 1px on the screen
          // so fullPage screenshot size is 1280x721
          launchOptions.args.push('--width=1280')
          launchOptions.args.push('--height=721')
        }

        return launchOptions
      })
    },
  },
});
