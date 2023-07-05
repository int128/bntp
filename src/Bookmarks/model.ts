export type BookmarkFolderID = string

export const isBookmarkFolderIDArray = (value: unknown): value is readonly BookmarkFolderID[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string')

export type BookmarkFolder = {
  readonly id: BookmarkFolderID
  readonly depth: number
  readonly title: string
  readonly bookmarks: readonly Bookmark[]
}

export type BookmarkID = string

export type Bookmark = {
  readonly id: BookmarkID
  readonly title: string
  readonly url: string
  readonly folderID: BookmarkFolderID
}

export const filterBookmarks = (bookmarks: readonly Bookmark[], search: string): readonly Bookmark[] => {
  if (!search) {
    return bookmarks
  }
  const searchLower = search.toLocaleLowerCase()
  return bookmarks.filter(
    (b) => b.title.toLocaleLowerCase().includes(searchLower) || b.url.toLocaleLowerCase().includes(searchLower),
  )
}

export type Position = {
  readonly folderID: BookmarkFolderID
  readonly index: number
}

export class FolderCollapse {
  private readonly collapsedIDs: ReadonlySet<BookmarkFolderID>

  constructor(collapsedIDs: readonly BookmarkFolderID[] | ReadonlySet<BookmarkFolderID>) {
    this.collapsedIDs = new Set(collapsedIDs)
  }

  isCollapsed(id: BookmarkFolderID): boolean {
    return this.collapsedIDs.has(id)
  }

  collapse(id: BookmarkFolderID): FolderCollapse {
    return new FolderCollapse([id, ...this.collapsedIDs])
  }

  expand(id: BookmarkFolderID): FolderCollapse {
    const newSet = new Set(this.collapsedIDs)
    newSet.delete(id)
    return new FolderCollapse(newSet)
  }

  serialize = (): readonly string[] => [...this.collapsedIDs]
}
