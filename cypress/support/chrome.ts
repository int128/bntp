import bookmarks from '../fixtures/bookmarks'
import topSites from '../fixtures/topSites'

const chrome = {
  bookmarks: {
    getTree: (f: (bookmarks: unknown) => void) => f(bookmarks),
    onChanged: { addListener: () => undefined },
    onChildrenReordered: { addListener: () => undefined },
    onCreated: { addListener: () => undefined },
    onMoved: { addListener: () => undefined },
    onRemoved: { addListener: () => undefined },
    update: () => undefined,
    remove: () => undefined,
  },

  topSites: {
    get: (f: (topSites: unknown) => void) => f(topSites),
  },

  storage: {
    sync: {
      get: () => undefined,
      set: () => undefined,
    },
    onChanged: {
      addListener: () => undefined,
    },
  },

  runtime: {
    id: 'dummy',
    getManifest: () => ({
      name: 'BNTP: Bookmarks in New Tab Page',
      version: '1.0.0.0',
      manifest_version: 2,
    }),
  },
}

export default chrome
