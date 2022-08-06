import { render, screen } from '@testing-library/react'
import App from './App'
import { chrome } from 'jest-chrome'

test('renders App', async () => {
  chrome.storage.sync.get.mockResolvedValue({} as never)

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
