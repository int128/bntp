import { withScreenshot } from 'storycap'
import type { Preview } from '@storybook/react'

const preview: Preview = {
  decorators: [withScreenshot()],
  parameters: {
    screenshot: {
      delay: 250,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
