import { Bookmark } from '../Bookmarks/model'
import { ShortcutKey } from '../ShortcutKey/model'

export type EditingBookmark = Bookmark & {
  shortcutKey?: ShortcutKey
}
