import { useBookmarkFolders, useShortcutMap } from '../Bookmarks/repository'
import { FC } from 'react'
import { shortcutKeyOf } from '../Bookmarks/model'
import { useGlobalKey } from '../infrastructure/globalKey'

const ShortcutKeyComponent: FC = () => {
  const bookmarkFolders = useBookmarkFolders()
  const bookmarks = bookmarkFolders.flatMap((f) => f.bookmarks)
  const [shortcutMap] = useShortcutMap()

  useGlobalKey((key: string) => {
    const shortcutKey = shortcutKeyOf(key)
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
