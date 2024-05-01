import './component.css'
import '../index.css'
import type { Meta, StoryObj } from '@storybook/react'
import App from './component'
import { ChromeContext } from '../infrastructure/chrome'
import { chrome } from '../infrastructure/chrome.mock'

const meta: Meta<typeof App> = {
  component: App,
}

export default meta
type Story = StoryObj<typeof App>

export const Primary: Story = {
  render: () => (
    <ChromeContext.Provider value={chrome}>
      <App />
    </ChromeContext.Provider>
  ),
}
