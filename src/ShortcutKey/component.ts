import type { FC } from 'react'
import type { BookmarkFolder } from '../Bookmarks/model'
import { useGlobalKey } from './infrastructure'
import { type ShortcutMap, shortcutKeyOf } from './model'

type ShortcutKeyComponentProps = {
  bookmarkFolders: readonly BookmarkFolder[]
  shortcutMap: ShortcutMap
}

const ShortcutKeyComponent: FC<ShortcutKeyComponentProps> = ({ bookmarkFolders, shortcutMap }) => {
  const bookmarks = bookmarkFolders.flatMap((f) => f.bookmarks)

  useGlobalKey((e) => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
      return
    }
    const shortcutKey = shortcutKeyOf(e.key)
    if (!shortcutKey) {
      return
    }
    const bookmarkID = shortcutMap.getByShortcutKey(shortcutKey)
    if (!bookmarkID) {
      return
    }
    const bookmark = bookmarks.find((b) => b.id === bookmarkID)
    if (!bookmark) {
      return
    }
    window.location.href = bookmark.url
  })

  return null
}

export default ShortcutKeyComponent
