/* eslint-disable @typescript-eslint/require-await */

import { StorageAreaMock } from '../../infrastructure/chromeStorage.mock'
import fixtureBookmarks from './bookmarks'
import fixtureTopSites from './topSites'

const nullEvent = Object.freeze({
  addListener: () => undefined,
  removeListener: () => undefined,
})

const bookmarks = Object.freeze({
  getTree: async () => fixtureBookmarks,
  update: async () => undefined,
  remove: async () => undefined,
  onChanged: nullEvent,
  onChildrenReordered: nullEvent,
  onCreated: nullEvent,
  onMoved: nullEvent,
  onRemoved: nullEvent,
})

const topSites = Object.freeze({
  get: (callback: (topSites: chrome.topSites.MostVisitedURL[]) => void) => callback(fixtureTopSites),
})

const storage = Object.freeze({
  sync: new StorageAreaMock(),
})

const runtime = Object.freeze({
  id: 'dummy',
  getManifest: (): chrome.runtime.Manifest => ({
    name: 'BNTP: Bookmarks in New Tab Page',
    version: '1.0.0',
    manifest_version: 3,
  }),
})

export const chrome = Object.freeze({
  bookmarks,
  topSites,
  storage,
  runtime,
})
