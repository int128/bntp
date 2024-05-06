import './component.css'
import '../index.css'
import type { Meta, StoryObj } from '@storybook/react'
import App from './component'
import { ChromeContext } from '../infrastructure/chrome'
import { FaviconContext } from '../infrastructure/favicon'
import { LocalStorageContext } from '../infrastructure/localStorage'
import { chrome } from '../infrastructure/chrome.mock'
import { googleFavicon } from '../infrastructure/favicon.mock'
import { nullLocalStorage } from '../infrastructure/localStorage.mock'

const meta: Meta<typeof App> = {
  component: App,
}

export default meta
type Story = StoryObj<typeof App>

export const Primary: Story = {
  render: () => (
    <ChromeContext.Provider value={chrome}>
      <FaviconContext.Provider value={googleFavicon}>
        <LocalStorageContext.Provider value={nullLocalStorage}>
          <App />
        </LocalStorageContext.Provider>
      </FaviconContext.Provider>
    </ChromeContext.Provider>
  ),
}
