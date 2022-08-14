import { Bookmark, BookmarkFolder, BookmarkFolderID, FolderCollapse } from './model'
import { useEffect, useState } from 'react'
import { useChromeStorage } from '../infrastructure/chromeStorage'

export const useBookmarkFolders = () => {
  const [bookmarkFolders, setBookmarkFolders] = useState<readonly BookmarkFolder[]>([])
  useEffect(() => {
    getBookmarkFolders()
      .then((b) => setBookmarkFolders(b))
      .catch((e) => console.error(e))
    return subscribeBookmarks(setBookmarkFolders)
  }, [])
  return bookmarkFolders
}

const getBookmarkFolders = async (): Promise<readonly BookmarkFolder[]> => {
  return traverseBookmarkTree(await chrome.bookmarks.getTree())
}

const subscribeBookmarks = (handler: (bookmarkFolders: readonly BookmarkFolder[]) => void): (() => void) => {
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

export const traverseBookmarkTree = (
  tree: readonly chrome.bookmarks.BookmarkTreeNode[],
  depth = 0
): readonly BookmarkFolder[] =>
  tree.flatMap((node) => {
    if (node.children === undefined) {
      return []
    }
    const childFolders = node.children.filter((child) => child.url === undefined)
    const childBookmarks = node.children.filter((child) => child.url !== undefined)
    if (childBookmarks.length === 0) {
      return traverseBookmarkTree(childFolders, depth)
    }

    const thisFolder = {
      id: node.id,
      depth,
      title: node.title,
      bookmarks: childBookmarks.map((b) => ({
        id: b.id,
        title: b.title,
        url: b.url || '',
        index: b.index || 0,
        folderID: node.id,
      })),
    }
    return [thisFolder, ...traverseBookmarkTree(childFolders, depth + 1)]
  })

export const updateBookmark = async (bookmark: Bookmark) => {
  await chrome.bookmarks.update(bookmark.id, { url: bookmark.url, title: bookmark.title })
}

export const removeBookmark = async (bookmark: Bookmark) => {
  await chrome.bookmarks.remove(bookmark.id)
}

export const moveBookmark = async (bookmark: Bookmark, folderID: BookmarkFolderID, index: number) => {
  await chrome.bookmarks.move(bookmark.id, { parentId: folderID, index })
}

export const useFolderCollapse = (): readonly [FolderCollapse, (newSet: FolderCollapse) => void] => {
  const [ids, setIDs] = useChromeStorage<readonly BookmarkFolderID[]>({
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
