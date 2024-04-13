import './component.css'
import '../index.css'
import type { Meta, StoryObj } from '@storybook/react'
import App from './component'
import { mockChromeAPI } from './fixtures/chrome'

const meta: Meta<typeof App> = {
  component: App,
}

export default meta
type Story = StoryObj<typeof App>

mockChromeAPI()

export const Primary: Story = {
  render: () => <App />,
}
