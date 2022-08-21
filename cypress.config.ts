import { defineConfig } from 'cypress'

const width = 1280
const height = 800

export default defineConfig({
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
    video: false,
    viewportWidth: width,
    viewportHeight: height,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        // https://www.cypress.io/blog/2021/03/01/generate-high-resolution-videos-and-screenshots/
        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push(`--window-size=${width},${height}`)
          launchOptions.args.push('--force-device-scale-factor=1')
        }
        return launchOptions
      })
    },
  },
})
