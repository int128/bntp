/* eslint-disable @typescript-eslint/require-await */
import bookmarks from '../fixtures/bookmarks'
import topSites from '../fixtures/topSites'

const chrome = {
  bookmarks: {
    getTree: async () => bookmarks,
    onChanged: { addListener: () => undefined },
    onChildrenReordered: { addListener: () => undefined },
    onCreated: { addListener: () => undefined },
    onMoved: { addListener: () => undefined },
    onRemoved: { addListener: () => undefined },
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
