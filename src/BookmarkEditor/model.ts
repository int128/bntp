import { Bookmark, ShortcutKey } from '../Bookmarks/model'

export type EditingBookmark = Bookmark & {
  shortcutKey?: ShortcutKey
}
