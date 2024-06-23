import '../index.css'
import { Meta, StoryObj } from '@storybook/react'
import { ChromeContext } from '../infrastructure/chrome'
import PreferencesComponent from './component'
import { chromeWithFixtures } from '../infrastructure/chrome.mock'
import { useThemeStyle } from '../Themes/style'

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
