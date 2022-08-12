/* eslint-disable @typescript-eslint/require-await */
import bookmarks from '../fixtures/bookmarks'
import topSites from '../fixtures/topSites'

const nullEvent = {
  addListener: () => undefined,
  removeListener: () => undefined,
}

const chrome = {
  bookmarks: {
    getTree: async () => bookmarks,
    onChanged: nullEvent,
    onChildrenReordered: nullEvent,
    onCreated: nullEvent,
    onMoved: nullEvent,
    onRemoved: nullEvent,
    update: async () => undefined,
    remove: async () => undefined,
  },

  topSites: {
    get: (f: (topSites: unknown) => void) => f(topSites),
  },

  storage: {
    sync: {
      get: async () => ({}),
      set: async () => undefined,
    },
    onChanged: nullEvent,
  },

  runtime: {
    id: 'dummy',
    getManifest: () => ({
      name: 'BNTP: Bookmarks in New Tab Page',
      version: '1.0.0',
      manifest_version: 3,
    }),
  },
}

export default chrome

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
