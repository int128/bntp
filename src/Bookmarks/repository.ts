import { Bookmark, BookmarkFolder, BookmarkFolderID, BookmarkPreference, chromePages } from './model'
import { useEffect, useState } from 'react'
import { useChromeStorage } from '../infrastructure/chromeStorage'

export const useBookmarkFolders = () => {
  const [bookmarkFolders, setBookmarkFolders] = useState<BookmarkFolder[]>([])
  useEffect(() => {
    void getBookmarks().then(setBookmarkFolders)
    return subscribeBookmarks(setBookmarkFolders)
  }, [])
  return bookmarkFolders
}

const getBookmarks = async (): Promise<BookmarkFolder[]> =>
  new Promise((resolve) => {
    // TODO: use promise in chrome manifest v3
    chrome.bookmarks.getTree((tree) => {
      const bookmarks = traverseTree(tree)
      bookmarks.push(chromePages)
      resolve(bookmarks)
    })
  })

const subscribeBookmarks = (handler: (bookmarkFolders: BookmarkFolder[]) => void): (() => void) => {
  const listener = () => void getBookmarks().then(handler)
  chrome.bookmarks.onChanged.addListener(listener)
  chrome.bookmarks.onChildrenReordered.addListener(listener)
  chrome.bookmarks.onCreated.addListener(listener)
  chrome.bookmarks.onMoved.addListener(listener)
  chrome.bookmarks.onRemoved.addListener(listener)
  return () => {
    chrome.bookmarks.onChanged.removeListener(listener)
    chrome.bookmarks.onChildrenReordered.removeListener(listener)
    chrome.bookmarks.onCreated.removeListener(listener)
    chrome.bookmarks.onMoved.removeListener(listener)
    chrome.bookmarks.onRemoved.removeListener(listener)
  }
}

const traverseTree = (tree: chrome.bookmarks.BookmarkTreeNode[], depth = 0): BookmarkFolder[] =>
  tree.flatMap((node) => {
    if (node.children === undefined) {
      return []
    }
    const childFolders = node.children.filter((child) => child.url === undefined)
    const childBookmarks = node.children.filter((child) => child.url !== undefined)
    if (childBookmarks.length === 0) {
      return traverseTree(childFolders, depth)
    }

    const thisFolder = {
      id: node.id,
      depth,
      title: node.title,
      bookmarks: childBookmarks.map((b) => ({
        id: b.id,
        title: b.title,
        url: b.url || '',
      })),
    }
    return [thisFolder, ...traverseTree(childFolders, depth + 1)]
  })

export const updateBookmark = async (bookmark: Bookmark): Promise<void> =>
  new Promise((resolve) => {
    // TODO: use promise in chrome manifest v3
    chrome.bookmarks.update(bookmark.id, { url: bookmark.url, title: bookmark.title }, () => resolve())
  })

export const removeBookmark = async (bookmark: Bookmark): Promise<void> =>
  new Promise((resolve) => {
    // TODO: use promise in chrome manifest v3
    chrome.bookmarks.remove(bookmark.id, () => resolve())
  })

export const useCollapsedBookmarkFolderIDs = () =>
  useChromeStorage<BookmarkFolderID[]>({
    areaName: 'sync',
    key: 'v3.collapsedBookmarkFolderIDs',
    initialValue: [],
    assertType: (value: unknown) => {
      if (!Array.isArray(value)) {
        throw new Error('value is not array')
      }
    },
  })

export const useBookmarkPreferences = () =>
  useChromeStorage<BookmarkPreference[]>({
    areaName: 'sync',
    key: 'v3.bookmarkPreferences',
    initialValue: [],
    assertType: (value: unknown) => {
      if (!Array.isArray(value)) {
        throw new Error('value is not array')
      }
    },
  })
