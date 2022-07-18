export type BookmarkFolderID = string

export type BookmarkFolder = {
  id: BookmarkFolderID
  depth: number
  title: string
  bookmarks: Bookmark[]
}

export type Bookmark = {
  id: string
  title: string
  url: string
}

export type BookmarkPreference = {
  id: string
  shortcutKey: string
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
