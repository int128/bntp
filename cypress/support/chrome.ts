/* eslint-disable @typescript-eslint/require-await */
import { StorageAreaMock } from '../../src/infrastructure/chromeStorage.mock'
import fixtureBookmarks from '../fixtures/bookmarks'
import fixtureTopSites from '../fixtures/topSites'

export const mockChromeAPI = () => {
  const nullEvent = {
    addListener: () => undefined,
    removeListener: () => undefined,
  }

  const bookmarks = {
    getTree: async () => fixtureBookmarks,
    onChanged: nullEvent,
    onChildrenReordered: nullEvent,
    onCreated: nullEvent,
    onMoved: nullEvent,
    onRemoved: nullEvent,
    update: async () => undefined,
    remove: async () => undefined,
  }

  const topSites = {
    get: (f: (topSites: unknown) => void) => f(fixtureTopSites),
  }

  const storage = {
    sync: new StorageAreaMock(),
  }

  const runtime = {
    id: 'dummy',
    getManifest: () => ({
      name: 'BNTP: Bookmarks in New Tab Page',
      version: '1.0.0',
      manifest_version: 3,
    }),
  }

  Object.assign(window, {
    chrome: {
      bookmarks,
      topSites,
      storage,
      runtime,
    },
  })
}

// favicon API is not available on Cypress
export const mockFaviconAPI = () =>
  cy.intercept(
    {
      method: 'GET',
      pathname: '/_favicon/',
    },
    (req) => {
      const { pageUrl, size } = req.query
      const googleFaviconURL = `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(pageUrl)}&sz=${size}`
      req.redirect(googleFaviconURL)
    }
  )
