import { StorageAreaMock } from '../../infrastructure/chromeStorage.mock'
import fixtureBookmarks from './bookmarks'
import fixtureTopSites from './topSites'

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
