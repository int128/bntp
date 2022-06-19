import { Bookmark, BookmarkFolder, chromePages, Subscription } from './model'

export const subscribeBookmarks = (handler: (bookmarkFolders: BookmarkFolder[]) => void): Subscription => {
  if (chrome.bookmarks === undefined) {
    return {
      refresh() {
        return
      },
      unsubscribe() {
        return
      },
    }
  }

  // TODO: use promise in chrome manifest v3
  const listener = () => chrome.bookmarks.getTree((tree) => handler(transformBookmarks(tree)))
  chrome.bookmarks.onChanged.addListener(listener)
  chrome.bookmarks.onChildrenReordered.addListener(listener)
  chrome.bookmarks.onCreated.addListener(listener)
  chrome.bookmarks.onMoved.addListener(listener)
  chrome.bookmarks.onRemoved.addListener(listener)
  return {
    refresh() {
      listener()
    },
    unsubscribe() {
      chrome.bookmarks.onChanged.removeListener(listener)
      chrome.bookmarks.onChildrenReordered.removeListener(listener)
      chrome.bookmarks.onCreated.removeListener(listener)
      chrome.bookmarks.onMoved.removeListener(listener)
      chrome.bookmarks.onRemoved.removeListener(listener)
    },
  }
}

const transformBookmarks = (nodes: chrome.bookmarks.BookmarkTreeNode[]): BookmarkFolder[] => {
  const folders = flatten(nodes)
  folders.push(chromePages)
  return folders
}

const flatten = (nodes: chrome.bookmarks.BookmarkTreeNode[]): BookmarkFolder[] => nodes.flatMap(traverse)

const traverse = (node: chrome.bookmarks.BookmarkTreeNode, depth = 0): BookmarkFolder[] => {
  if (node.children === undefined) {
    return []
  }
  const folderNodes = node.children.filter((child) => child.url === undefined)
  const bookmarkNodes = node.children.filter((child) => child.url !== undefined)

  if (bookmarkNodes.length === 0) {
    return folderNodes.flatMap((folderNode) => traverse(folderNode, depth))
  }

  const bookmarks = bookmarkNodes.map((b) => ({
    id: b.id,
    title: b.title,
    url: b.url || '',
  }))
  const folder = {
    id: node.id,
    depth,
    title: node.title,
    bookmarks,
  }

  const folders = folderNodes.flatMap((folderNode) => traverse(folderNode, depth + 1))
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
