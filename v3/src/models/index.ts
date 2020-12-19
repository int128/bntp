export interface BookmarkFolder {
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
