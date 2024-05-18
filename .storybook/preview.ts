import { withScreenshot } from 'storycap'
import type { Preview } from '@storybook/react'

const preview: Preview = {
  decorators: [withScreenshot()],
  parameters: {
    screenshot: {
      delay: 250,
      viewport: {
        // Chrome Web Store requirement
        width: 1280,
        height: 800,
        deviceScaleFactor: 1,
      },
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
