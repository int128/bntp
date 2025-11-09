/// <reference types="vitest/config" />
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    clearMocks: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    projects: [
      {
        extends: true,
        plugins: [storybookTest()],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
            screenshotDirectory: '__screenshots__',
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
})
