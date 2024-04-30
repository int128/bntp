/* eslint-disable @typescript-eslint/require-await */

import { StorageAreaMock } from '../../infrastructure/chromeStorage.mock'
import fixtureBookmarks from './bookmarks'
import fixtureTopSites from './topSites'

export const chromeMock = () => {
  const nullEvent = {
    addListener: () => undefined,
    removeListener: () => undefined,
  }

  const bookmarks = {
    getTree: async () => fixtureBookmarks,
    update: async () => undefined,
    remove: async () => undefined,
    onChanged: nullEvent,
    onChildrenReordered: nullEvent,
    onCreated: nullEvent,
    onMoved: nullEvent,
    onRemoved: nullEvent,
  }

  const topSites = {
    get: (callback: (topSites: chrome.topSites.MostVisitedURL[]) => void) => callback(fixtureTopSites),
  }

  const storage = {
    sync: new StorageAreaMock(),
  }

  const runtime: Pick<typeof chrome.runtime, 'id' | 'getManifest'> = {
    id: 'dummy',
    getManifest: () => ({
      name: 'BNTP: Bookmarks in New Tab Page',
      version: '1.0.0',
      manifest_version: 3,
    }),
  }

  return {
    bookmarks,
    topSites,
    storage,
    runtime,
  }
}
