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

export type ShortcutKey = string

export type ShortcutEntries = [ShortcutKey, BookmarkID][]

export class ShortcutMap {
  private readonly map: Map<ShortcutKey, BookmarkID>
  constructor(entries: ShortcutEntries) {
    this.map = new Map(entries)
  }

  getByID(id: BookmarkID): ShortcutKey | undefined {
    for (const [key, id] of this.map) {
      
    }
  }

  set(id: BookmarkID, key: ShortcutKey): ShortcutMap {
    const newMap = new Map(this.map)
    newMap.set(key, id)
    return new ShortcutMap([...this.entries(), [key, id]])
  }

  delete(id: BookmarkID): ShortcutMap {
    const newMap = new Map(this.map)
    newMap.delete()
    return new ShortcutMap(newMap)
  }

  entries(): ShortcutEntries {
    return Array.from(this.map.entries())
  }
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
