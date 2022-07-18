import { Bookmark } from '../Bookmarks/model'

export type EditingBookmark = Bookmark & {
  shortcutKey?: string
}
