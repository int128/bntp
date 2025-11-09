import { setProjectAnnotations } from '@storybook/react-vite'
import { page } from '@vitest/browser/context'
import * as projectAnnotations from './preview'

setProjectAnnotations([
  projectAnnotations,
  {
    afterEach: async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
      await page.screenshot()
    },
  },
])
