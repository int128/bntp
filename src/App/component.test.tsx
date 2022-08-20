import { render, screen } from '@testing-library/react'
import App from './component'
import { StorageAreaMock } from '../infrastructure/chromeStorage.mock'
import { chrome } from 'jest-chrome'

test('renders App', async () => {
  const storageMock = { sync: new StorageAreaMock() }
  Object.assign(global.chrome.storage, storageMock)

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

  const view = render(<App />)

  expect(await screen.findByText(/Google/)).toBeInTheDocument()

  expect(storageMock.sync.onChanged.listeners.length).toBeGreaterThan(0)
  view.unmount()
  expect(storageMock.sync.onChanged.listeners.length).toBe(0)
})
