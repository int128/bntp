import { Bookmark, BookmarkFolder, BookmarkFolderID, FolderCollapse } from './model'
import { useEffect, useState } from 'react'
import { useChromeStorage } from '../infrastructure/chromeStorage'

export const useBookmarkFolders = () => {
  const [bookmarkFolders, setBookmarkFolders] = useState<BookmarkFolder[]>([])
  useEffect(() => {
    getBookmarkFolders()
      .then((b) => setBookmarkFolders(b))
      .catch((e) => console.error(e))
    return subscribeBookmarks(setBookmarkFolders)
  }, [])
  return bookmarkFolders
}

const getBookmarkFolders = async (): Promise<BookmarkFolder[]> => {
  return traverseTree(await chrome.bookmarks.getTree())
}

const subscribeBookmarks = (handler: (bookmarkFolders: BookmarkFolder[]) => void): (() => void) => {
  const listener = () => {
    getBookmarkFolders()
      .then((b) => handler(b))
      .catch((e) => console.error(e))
  }
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

export const updateBookmark = async (bookmark: Bookmark) => {
  await chrome.bookmarks.update(bookmark.id, { url: bookmark.url, title: bookmark.title })
}

export const removeBookmark = async (bookmark: Bookmark) => {
  await chrome.bookmarks.remove(bookmark.id)
}

export const useFolderCollapse = (): [FolderCollapse, (newSet: FolderCollapse) => void] => {
  const [ids, setIDs] = useChromeStorage<BookmarkFolderID[]>({
    areaName: 'sync',
    key: 'v3.collapsedBookmarkFolderIDs',
    initialValue: [],
    assertType: (value: unknown) => {
      if (!Array.isArray(value)) {
        throw new Error('value is not array')
      }
    },
  })
  return [new FolderCollapse(ids), (newSet: FolderCollapse) => setIDs(newSet.serialize())]
}
