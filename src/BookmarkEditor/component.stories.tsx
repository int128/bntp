import '../index.css'
import { Meta, StoryObj } from '@storybook/react'
import BookmarkEditorComponent from './component'
import { ChromeContext } from '../infrastructure/chrome'
import { EditingBookmark } from './model'
import { FaviconContext } from '../infrastructure/favicon'
import { chromeWithFixtures } from '../infrastructure/chrome.mock'
import { googleFavicon } from '../infrastructure/favicon.mock'

const meta: Meta<typeof BookmarkEditorComponent> = {
  component: BookmarkEditorComponent,
}

export default meta
type Story = StoryObj<typeof BookmarkEditorComponent>

export const Primary: Story = {
  render: () => (
    <ChromeContext.Provider value={chromeWithFixtures}>
      <FaviconContext.Provider value={googleFavicon}>
        <BookmarkEditorComponent
          onChange={() => undefined}
          onRequestClose={() => undefined}
          editingBookmark={
            new EditingBookmark(
              {
                id: '0',
                title: 'Google Calendar',
                url: 'https://calendar.google.com',
                folderID: '0',
              },
              undefined,
            )
          }
        />
      </FaviconContext.Provider>
    </ChromeContext.Provider>
  ),
}
