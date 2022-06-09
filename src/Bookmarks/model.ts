export type BookmarkFolderID = string

export interface BookmarkFolder {
  id: BookmarkFolderID
  title: string
  bookmarks: Bookmark[]
}

export interface Bookmark {
  title: string
  url: string
}

export interface Subscription {
  refresh(): void
  unsubscribe(): void
}

export interface BookmarkFolderPreference {
  collapsedIDs: BookmarkFolderID[]
}

export function collapseBookmarkFolder(
  preferences: BookmarkFolderPreference,
  id: BookmarkFolderID
): BookmarkFolderPreference {
  return {
    ...preferences,
    collapsedIDs: preferences.collapsedIDs.concat(id),
  }
}

export function expandBookmarkFolder(
  preferences: BookmarkFolderPreference,
  id: BookmarkFolderID
): BookmarkFolderPreference {
  return {
    ...preferences,
    collapsedIDs: preferences.collapsedIDs.filter((e) => e !== id),
  }
}
