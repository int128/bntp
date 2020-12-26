export interface BookmarkFolder {
  id: string
  title: string
  bookmarks: Bookmark[]
}

export interface Bookmark {
  title: string
  url: string
}

export interface TopSite {
  title: string;
  url: string;
}

export interface Subscription {
  refresh(): void
  unsubscribe(): void
}
