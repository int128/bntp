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

export class FolderCollapse {
  private readonly collapsedIDs: Set<BookmarkFolderID>

  constructor(collapsedIDs: BookmarkFolderID[] | Set<BookmarkFolderID>) {
    this.collapsedIDs = new Set(collapsedIDs)
  }

  isCollapsed(id: BookmarkFolderID): boolean {
    return this.collapsedIDs.has(id)
  }

  collapse(id: BookmarkFolderID): FolderCollapse {
    return new FolderCollapse([id, ...this.collapsedIDs])
  }

  expand(id: BookmarkFolderID): FolderCollapse {
    const newSet = new FolderCollapse(this.collapsedIDs)
    newSet.collapsedIDs.delete(id)
    return newSet
  }

  serialize = () => [...this.collapsedIDs.values()]
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
