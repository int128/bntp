import '../index.css'
import type { Meta, StoryObj } from '@storybook/react'
import { ChromeContext } from '../infrastructure/chrome'
import { chromeWithFixtures } from '../infrastructure/chrome.mock'
import { FaviconContext } from '../infrastructure/favicon'
import { googleFavicon } from '../infrastructure/favicon.mock'
import { NullLocalStorageProvider } from '../infrastructure/localStorage.mock'
import { useThemeStyle } from '../Themes/style'
import App from './component'

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
