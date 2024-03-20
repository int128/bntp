import { render, screen } from '@testing-library/react'
import App from './component'
import { vi } from 'vitest'

test('renders App', async () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  vi.mocked(chrome.storage.sync.get).mockResolvedValue({} as never)

  // jest-chrome does not have onChanged mock
  Object.assign(chrome.storage.sync, {
    onChanged: {
      addListener: vi.fn(),
      removeListener: vi.fn(),
    },
  })

  vi.mocked(chrome.bookmarks.getTree).mockResolvedValue([
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
