export type Toggles = {
  readonly topSites: boolean
  readonly bookmarks: boolean
  readonly indent: boolean
}

export const defaultToggles: Toggles = {
  bookmarks: true,
  topSites: true,
  indent: false,
}
