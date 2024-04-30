import './component.css'
import '../index.css'
import type { Meta, StoryObj } from '@storybook/react'
import App from './component'
import { chromeMock } from './fixtures/chrome.mock'

const meta: Meta<typeof App> = {
  component: App,
}

export default meta
type Story = StoryObj<typeof App>

Object.assign({ chrome: chromeMock })

export const Primary: Story = {
  render: () => <App />,
}
