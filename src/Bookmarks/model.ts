export type BookmarkFolderID = string

export type BookmarkFolder = {
  id: BookmarkFolderID
  title: string
  bookmarks: Bookmark[]
}

export type Bookmark = {
  title: string
  url: string
}

export type Subscription = {
  refresh(): void
  unsubscribe(): void
}

export type BookmarkFolderPreference = {
  collapsedIDs: BookmarkFolderID[]
}

export const collapseBookmarkFolder = (
  preferences: BookmarkFolderPreference,
  id: BookmarkFolderID
): BookmarkFolderPreference => ({
  ...preferences,
  collapsedIDs: preferences.collapsedIDs.concat(id),
})

export const expandBookmarkFolder = (
  preferences: BookmarkFolderPreference,
  id: BookmarkFolderID
): BookmarkFolderPreference => ({
  ...preferences,
  collapsedIDs: preferences.collapsedIDs.filter((e) => e !== id),
})

export const chromePages: BookmarkFolder = {
  id: 'Chrome',
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
      title: 'Plugins',
      url: 'chrome://plugins',
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
