export type BookmarkFolderID = string

export type BookmarkFolder = {
  id: BookmarkFolderID
  depth: number
  title: string
  bookmarks: readonly Bookmark[]
}

export type BookmarkID = string

export type Bookmark = {
  id: BookmarkID
  title: string
  url: string
}

export class FolderCollapse {
  private readonly collapsedIDs: Set<BookmarkFolderID>

  constructor(collapsedIDs: readonly BookmarkFolderID[] | Set<BookmarkFolderID>) {
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

  serialize = (): readonly string[] => [...this.collapsedIDs.values()]
}
