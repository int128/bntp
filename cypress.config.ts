import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        // https://docs.cypress.io/api/plugins/browser-launch-api#Modify-browser-launch-arguments-preferences-and-extensions
        launchOptions.extensions.push(`${__dirname}/build`)
        return launchOptions
      })
    },
  },
});
