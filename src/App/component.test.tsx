import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import App from './component'

test('renders App', async () => {
  const bookmarks: chrome.bookmarks.BookmarkTreeNode[] = [
    {
      id: '1',
      title: 'My Bookmarks',
      children: [
        {
          id: '10',
          title: 'Google',
          url: 'https://www.example.com',
          syncing: true,
        },
      ],
      syncing: true,
    },
  ]
  vi.mocked(chrome.bookmarks.getTree).mockImplementation(() => Promise.resolve(bookmarks))
  vi.mocked(chrome.runtime.getManifest).mockReturnValue({
    manifest_version: 3,
    name: 'bntp-mock',
    version: '0.0.0.0',
  })

  render(<App />)

  expect(await screen.findByText(/Google/)).toBeInTheDocument()
})
