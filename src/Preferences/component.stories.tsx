import '../index.css'
import type { Meta, StoryObj } from '@storybook/react'
import { ChromeContext } from '../infrastructure/chrome'
import { chromeWithFixtures } from '../infrastructure/chrome.mock'
import { useThemeStyle } from '../Themes/style'
import PreferencesComponent from './component'

const meta: Meta<typeof PreferencesComponent> = {
  component: PreferencesComponent,
}

export default meta
type Story = StoryObj<typeof PreferencesComponent>

export const Primary: Story = {
  render: () => {
    useThemeStyle('standard', 'light')
    return (
      <ChromeContext.Provider value={chromeWithFixtures}>
        <PreferencesComponent open={true} onRequestClose={() => undefined} />
      </ChromeContext.Provider>
    )
  },
}
