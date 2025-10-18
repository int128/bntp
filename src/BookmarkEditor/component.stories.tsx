import '../index.css'
import type { Meta, StoryObj } from '@storybook/react'
import { ChromeContext } from '../infrastructure/chrome'
import { chromeWithFixtures } from '../infrastructure/chrome.mock'
import { FaviconContext } from '../infrastructure/favicon'
import { googleFavicon } from '../infrastructure/favicon.mock'
import { useThemeStyle } from '../Themes/style'
import BookmarkEditorComponent from './component'

const meta: Meta<typeof BookmarkEditorComponent> = {
  component: BookmarkEditorComponent,
}

export default meta
type Story = StoryObj<typeof BookmarkEditorComponent>

export const Primary: Story = {
  render: () => {
    useThemeStyle('standard', 'light')
    return (
      <ChromeContext.Provider value={chromeWithFixtures}>
        <FaviconContext.Provider value={googleFavicon}>
          <BookmarkEditorComponent
            open={true}
            bookmark={{
              id: '0',
              title: 'Google Calendar',
              url: 'https://calendar.google.com',
              folderID: '0',
            }}
            shortcutKey={undefined}
            onRequestClose={() => undefined}
          />
        </FaviconContext.Provider>
      </ChromeContext.Provider>
    )
  },
}
