import { render, screen } from '@testing-library/react'
import App from './component'
import { vi } from 'vitest'

test('renders App', async () => {
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
