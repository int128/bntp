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
