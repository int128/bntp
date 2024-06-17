import '../index.css'
import type { Meta, StoryObj } from '@storybook/react'
import App from './component'
import { ChromeContext } from '../infrastructure/chrome'
import { FaviconContext } from '../infrastructure/favicon'
import { NullLocalStorageProvider } from '../infrastructure/localStorage.mock'
import { chromeWithFixtures } from '../infrastructure/chrome.mock'
import { googleFavicon } from '../infrastructure/favicon.mock'
import { useThemeStyle } from '../Themes/style'

const meta: Meta<typeof App> = {
  component: App,
}

export default meta
type Story = StoryObj<typeof App>

export const Primary: Story = {
  render: () => {
    useThemeStyle('standard', 'light')
    return (
      <ChromeContext.Provider value={chromeWithFixtures}>
        <FaviconContext.Provider value={googleFavicon}>
          <NullLocalStorageProvider>
            <App />
          </NullLocalStorageProvider>
        </FaviconContext.Provider>
      </ChromeContext.Provider>
    )
  },
}

export const Dark: Story = {
  render: () => {
    useThemeStyle('standard', 'dark')
    return (
      <ChromeContext.Provider value={chromeWithFixtures}>
        <FaviconContext.Provider value={googleFavicon}>
          <NullLocalStorageProvider>
            <App />
          </NullLocalStorageProvider>
        </FaviconContext.Provider>
      </ChromeContext.Provider>
    )
  },
}
