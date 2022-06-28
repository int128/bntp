export type BookmarkFolderID = string

export type BookmarkFolder = {
  id: BookmarkFolderID
  depth: number
  title: string
  bookmarks: Bookmark[]
}

export type BookmarkID = string

export type Bookmark = {
  id?: BookmarkID
  title: string
  url: string
  accessKey?: string
}

export class BookmarkFolderIDs {
  ids: readonly BookmarkFolderID[]

  constructor(ids: BookmarkFolderID[] = []) {
    this.ids = ids
  }

  contains = (id: BookmarkFolderID): boolean => this.ids.indexOf(id) !== -1
  add = (id: BookmarkFolderID) => new BookmarkFolderIDs([...this.ids, id])
  remove = (id: BookmarkFolderID) => new BookmarkFolderIDs(this.ids.filter((e) => e !== id))
}

export class AccessKeyMap {
  keys: Map<string, BookmarkID>

  constructor(keys: Map<string, BookmarkID>) {
    this.keys = keys
  }

  get = (key: string): BookmarkID | undefined => this.keys.get(key)
}

export const chromePages: BookmarkFolder = {
  id: 'Chrome',
  depth: 0,
  title: 'Chrome Pages',
  bookmarks: [
    {
      title: 'Bookmarks',
      url: 'chrome://bookmarks',
    },
    {
      title: 'Downloads',
      url: 'chrome://downloads',
    },
    {
      title: 'Apps',
      url: 'chrome://apps',
    },
    {
      title: 'Settings',
      url: 'chrome://settings',
    },
    {
      title: 'Internals',
      url: 'chrome://about',
    },
  ],
}
