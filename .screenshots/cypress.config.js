const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    env: {
      ADMIN_LOGIN: 'lauren@fastlane.inc',
      ADMIN_PASS: 'lauren4711',
      AGENT1_LOGIN: 'liam@fastlane.inc',
      AGENT1_PASS: 'liam4711',
      AGENT2_LOGIN: 'morgan@fastlane.inc',
      AGENT2_PASS: 'morgan4711',
    },
    defaultCommandTimeout: 20000,
    supportFolder: 'cypress/support',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: '../src/public/screenshots/cypress',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: false, // will be activated within a test run
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          // fullPage screenshot size is 1920x1219 on non-retina screens
          // once the browser chrome is removed, screenshot will be cropped to 1920x1080
          launchOptions.args.push('--window-size=1920,1219')

          // force screen to be non-retina (1920x1080 size)
          launchOptions.args.push('--force-device-scale-factor=1')

          // Render scrollbars only as overlays.
          launchOptions.args.push('--enable-features=OverlayScrollbar')

          // Disable spellcheck in input fields.
          launchOptions.preferences.default['browser.enable_spellchecking'] = false
        }

        if (browser.name === 'electron' && browser.isHeadless) {
          // fullPage screenshot size is 1920x1080
          // on retina screens, this will always be double the size
          // there is currently no known way to automatically scale this down!
          launchOptions.preferences.width = 1920
          launchOptions.preferences.height = 1080

          // Disable spellcheck in input fields.
          launchOptions.preferences.spellcheck = false
        }

        if (browser.name === 'firefox' && browser.isHeadless) {
          // menubars take up height of 1px on the screen
          // so fullPage screenshot size is 1920x1081
          launchOptions.args.push('--width=1920')
          launchOptions.args.push('--height=1081')

          // Disable spellcheck in input fields.
          launchOptions.preferences['layout.spellcheckDefault'] = 0
        }

        return launchOptions
      })
    },
  },
});
