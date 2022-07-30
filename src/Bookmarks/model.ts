export type BookmarkFolderID = string

export type BookmarkFolder = {
  id: BookmarkFolderID
  depth: number
  title: string
  bookmarks: Bookmark[]
}

export type BookmarkID = string

export type Bookmark = {
  id: BookmarkID
  title: string
  url: string
}

export type ShortcutKey = string & {
  readonly ShortcutKey: unique symbol
}

export const shortcutKeyOf = (s: string): ShortcutKey => s.charAt(0).toUpperCase() as ShortcutKey

export class ShortcutMap {
  private readonly entries: [ShortcutKey, BookmarkID][]

  constructor(entries: [string, string][]) {
    this.entries = []
    const keySet = new Set<ShortcutKey>()
    const bookmarkSet = new Set<BookmarkID>()
    for (const [key, id] of entries) {
      const sanitizedKey = shortcutKeyOf(key)
      if (!sanitizedKey || !id || keySet.has(sanitizedKey) || bookmarkSet.has(id)) {
        continue
      }
      keySet.add(sanitizedKey)
      bookmarkSet.add(id)
      this.entries.push([sanitizedKey, id])
    }
  }

  getByBookmarkID(bookmarkID: BookmarkID): ShortcutKey | undefined {
    for (const [key, id] of this.entries) {
      if (id === bookmarkID) {
        return key
      }
    }
  }

  set(id: BookmarkID, key: ShortcutKey): ShortcutMap {
    return new ShortcutMap([[key, id], ...this.entries])
  }

  deleteByBookmarkID(bookmarkID: BookmarkID): ShortcutMap {
    return new ShortcutMap(this.entries.filter(([, id]) => id !== bookmarkID))
  }

  serialize = (): [string, string][] => [...this.entries]
}

export const chromePages: BookmarkFolder = {
  id: 'Chrome',
  depth: 0,
  title: 'Chrome Pages',
  bookmarks: [
    {
      id: 'Bookmarks',
      title: 'Bookmarks',
      url: 'chrome://bookmarks',
    },
    {
      id: 'Downloads',
      title: 'Downloads',
      url: 'chrome://downloads',
    },
    {
      id: 'Apps',
      title: 'Apps',
      url: 'chrome://apps',
    },
    {
      id: 'Settings',
      title: 'Settings',
      url: 'chrome://settings',
    },
    {
      id: 'Internals',
      title: 'Internals',
      url: 'chrome://about',
    },
  ],
}
