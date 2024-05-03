import { createContext } from 'react'

export type Bookmarks = {
  getTree: () => Promise<chrome.bookmarks.BookmarkTreeNode[]>
  onChanged: Pick<typeof chrome.bookmarks.onChanged, 'addListener' | 'removeListener'>
  onChildrenReordered: Pick<typeof chrome.bookmarks.onChildrenReordered, 'addListener' | 'removeListener'>
  onCreated: Pick<typeof chrome.bookmarks.onCreated, 'addListener' | 'removeListener'>
  onMoved: Pick<typeof chrome.bookmarks.onMoved, 'addListener' | 'removeListener'>
  onRemoved: Pick<typeof chrome.bookmarks.onRemoved, 'addListener' | 'removeListener'>
}

export type TopSites = {
  get: () => Promise<chrome.topSites.MostVisitedURL[]>
}

export type Runtime = Pick<typeof chrome.runtime, 'id' | 'getManifest'>

export type StorageAreaName = 'sync'

export type StorageArea = {
  get(key: string): Promise<Record<string, unknown>>
  set(items: Record<string, unknown>): Promise<void>
  onChanged: Pick<chrome.storage.StorageArea['onChanged'], 'addListener' | 'removeListener'>
}

export type Storage = {
  [k in StorageAreaName]: StorageArea
}

export type Chrome = {
  bookmarks: Bookmarks
  topSites: TopSites
  runtime: Runtime
  storage: Storage
}

export const ChromeContext = createContext<Chrome>(window.chrome)
