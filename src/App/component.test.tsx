import { render, screen } from '@testing-library/react'
import App from './component'
import { chrome } from 'jest-chrome'
import { vi } from 'vitest'

test('renders App', async () => {
  chrome.storage.sync.get.mockResolvedValue({} as never)

  // jest-chrome does not have onChanged mock
  Object.assign(chrome.storage.sync, {
    onChanged: {
      addListener: vi.fn(),
      removeListener: vi.fn(),
    },
  })

  chrome.bookmarks.getTree.mockResolvedValue([
    {
      id: '1',
      title: 'My Bookmarks',
      children: [
        {
          id: '10',
          title: 'Google',
          url: 'https://www.example.com',
        },
      ],
    },
  ])

  render(<App />)

  expect(await screen.findByText(/Google/)).toBeInTheDocument()
})
