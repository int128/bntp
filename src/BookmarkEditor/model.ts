import { Bookmark } from '../Bookmarks/model'
import { ShortcutKey } from '../ShortcutKey/model'

export class EditingBookmark {
  readonly bookmark: Bookmark
  readonly shortcutKey: ShortcutKey | undefined
  readonly valid: boolean

  constructor(bookmark: Bookmark, shortcutKey: ShortcutKey | undefined) {
    this.bookmark = bookmark
    this.shortcutKey = shortcutKey

    this.valid = this.bookmark.title !== '' && this.bookmark.url !== ''
  }

  changeBookmark(newValue: Bookmark) {
    return new EditingBookmark(newValue, this.shortcutKey)
  }

  changeShortcutKey(newValue: ShortcutKey | undefined) {
    return new EditingBookmark(this.bookmark, newValue)
  }
}
