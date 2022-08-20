import { ShortcutMap, shortcutKeyOf } from './model'
import { BookmarkFolder } from '../Bookmarks/model'
import { FC } from 'react'
import { useGlobalKey } from './infrastructure'

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
