import { useEffect, useState } from 'react'
import { useLocalStorage } from '../infrastructure/localstorage'
import { Bookmark, BookmarkFolder, chromePages, BookmarkFolderIDs, AccessKeyMap } from './model'

export const useBookmarkFolders = () => {
  const [bookmarkFolders, setBookmarkFolders] = useState<BookmarkFolder[]>([])
  const [accessKeyMap, setAccessKeyMap] = useAccessKeyMap()
  useEffect(() => {
    void getBookmarks(accessKeyMap).then(setBookmarkFolders)
    return subscribeBookmarks(setBookmarkFolders, accessKeyMap)
  }, [accessKeyMap])
  return bookmarkFolders
}

const useAccessKeyMap = () =>
  useLocalStorage<AccessKeyMap>({
    key: 'v3.bookmarkAccessKeys',
    initialValue: new AccessKeyMap(new Map()),
    parse: (stored: string): AccessKeyMap => {
      const p = JSON.parse(stored) as unknown
      if (Array.isArray(p)) {
        return new AccessKeyMap(new Map(p))
      }
      throw new Error(`invalid JSON: ${stored}`)
    },
    stringify: (value: AccessKeyMap) => JSON.stringify(value),
  })

const getBookmarks = async (accessKeyMap: AccessKeyMap): Promise<BookmarkFolder[]> =>
  new Promise((resolve) => {
    if (chrome.bookmarks === undefined) {
      return
    }
    // TODO: use promise in chrome manifest v3
    chrome.bookmarks.getTree((tree) => {
      const bookmarks = transformBookmarks(tree, accessKeyMap)
      resolve(bookmarks)
    })
  })

const subscribeBookmarks = (
  handler: (bookmarkFolders: BookmarkFolder[]) => void,
  accessKeyMap: AccessKeyMap
): (() => void) => {
  if (chrome.bookmarks === undefined) {
    return () => undefined
  }

  const listener = () => void getBookmarks(accessKeyMap).then(handler)
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

const transformBookmarks = (
  nodes: chrome.bookmarks.BookmarkTreeNode[],
  accessKeyMap: AccessKeyMap
): BookmarkFolder[] => {
  const folders = nodes.flatMap((node) => traverse(node, accessKeyMap))
  folders.push(chromePages)
  return folders
}

const traverse = (node: chrome.bookmarks.BookmarkTreeNode, accessKeyMap: AccessKeyMap, depth = 0): BookmarkFolder[] => {
  if (node.children === undefined) {
    return []
  }
  const folderNodes = node.children.filter((child) => child.url === undefined)
  const bookmarkNodes = node.children.filter((child) => child.url !== undefined)

  if (bookmarkNodes.length === 0) {
    return folderNodes.flatMap((folderNode) => traverse(folderNode, accessKeyMap, depth))
  }

  const bookmarks: Bookmark[] = bookmarkNodes.map((b) => ({
    id: b.id,
    title: b.title,
    url: b.url || '',
    accessKey: accessKeyMap.get(b.id),
  }))
  const folder = {
    id: node.id,
    depth,
    title: node.title,
    bookmarks,
  }

  const folders = folderNodes.flatMap((folderNode) => traverse(folderNode, accessKeyMap, depth + 1))
  return [folder, ...folders]
}

export const updateBookmark = async (bookmark: Bookmark): Promise<void> =>
  new Promise((resolve) => {
    if (bookmark.id === undefined) {
      return
    }
    // TODO: use promise in chrome manifest v3
    chrome.bookmarks.update(bookmark.id, { url: bookmark.url, title: bookmark.title }, () => resolve())
  })

export const removeBookmark = async (bookmark: Bookmark): Promise<void> =>
  new Promise((resolve) => {
    if (bookmark.id === undefined) {
      return
    }
    // TODO: use promise in chrome manifest v3
    chrome.bookmarks.remove(bookmark.id, () => resolve())
  })

export const useCollapsedBookmarkFolderIDs = () =>
  useLocalStorage<BookmarkFolderIDs>({
    key: 'v3.collapsedBookmarkFolderIDs',
    initialValue: new BookmarkFolderIDs(),
    parse: (stored: string): BookmarkFolderIDs => {
      const p = JSON.parse(stored) as unknown
      if (Array.isArray(p)) {
        return new BookmarkFolderIDs(p as string[])
      }
      throw new Error(`invalid JSON: ${stored}`)
    },
    stringify: (value: BookmarkFolderIDs) => JSON.stringify(value.ids),
  })
