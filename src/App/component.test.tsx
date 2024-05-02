import '@testing-library/jest-dom'
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
  vi.mocked(chrome.runtime.getManifest).mockReturnValue({
    manifest_version: 3,
    name: 'bntp-mock',
    version: '0.0.0.0',
  })

  render(<App />)

  expect(await screen.findByText(/Google/)).toBeInTheDocument()
})
