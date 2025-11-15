import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

// TODO: Chrome Web Store requirement
// viewport: {
//   width: 1280,
//   height: 800,
//   deviceScaleFactor: 1,
// },

export default preview
