import { setProjectAnnotations } from '@storybook/react-vite'
import * as projectAnnotations from './preview'
import { page } from '@vitest/browser/context'

setProjectAnnotations([
  projectAnnotations,
  {
    afterEach: async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
      await page.screenshot({
        element: document.body,
      })
    },
  },
])
