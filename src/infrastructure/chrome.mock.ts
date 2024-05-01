/* eslint-disable @typescript-eslint/require-await */

import { Bookmarks, Chrome, Runtime, Storage, TopSites } from './chrome'
import { StorageAreaMock } from './chromeStorage.mock'
import fixtureBookmarks from './fixtures/bookmarks'
import fixtureTopSites from './fixtures/topSites'

const nullEvent = Object.freeze({
  addListener: () => undefined,
  removeListener: () => undefined,
})

const bookmarks: Bookmarks = Object.freeze({
  getTree: async () => fixtureBookmarks,
  update: async () => undefined,
  remove: async () => undefined,
  onChanged: nullEvent,
  onChildrenReordered: nullEvent,
  onCreated: nullEvent,
  onMoved: nullEvent,
  onRemoved: nullEvent,
})

const topSites: TopSites = Object.freeze({
  get: async () => fixtureTopSites,
})

const storage: Storage = Object.freeze({
  sync: new StorageAreaMock(),
})

const runtime: Runtime = Object.freeze({
  id: 'dummy',
  getManifest: (): chrome.runtime.Manifest => ({
    name: 'BNTP: Bookmarks in New Tab Page',
    version: '1.0.0',
    manifest_version: 3,
  }),
})

export const chrome: Chrome = Object.freeze({
  bookmarks,
  topSites,
  storage,
  runtime,
})
