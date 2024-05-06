/* eslint-disable @typescript-eslint/require-await */

import { Bookmarks, Chrome, Runtime, Storage, StorageArea, TopSites } from './chrome'
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

const storageArea: StorageArea = Object.freeze({
  get: async () => ({}),
  set: async () => undefined,
  onChanged: nullEvent,
})

const storage: Storage = Object.freeze({
  sync: storageArea,
})

const runtime: Runtime = Object.freeze({
  id: 'dummy',
  getManifest: (): chrome.runtime.Manifest => ({
    name: 'BNTP: Bookmarks in New Tab Page',
    version: '1.0.0',
    manifest_version: 3,
  }),
})

export const chromeWithFixtures: Chrome = Object.freeze({
  bookmarks,
  topSites,
  storage,
  runtime,
})
