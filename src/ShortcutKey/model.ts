import { BookmarkID } from '../Bookmarks/model'

export type ShortcutKey = string & {
  readonly ShortcutKey: unique symbol
}

export const shortcutKeyOf = (s: string): ShortcutKey | undefined => {
  if (s.length < 1) {
    return
  }
  return s.charAt(0).toUpperCase() as ShortcutKey
}

export class ShortcutMap {
  private readonly entries: readonly [ShortcutKey, BookmarkID][]

  constructor(entries: readonly [string, string][]) {
    const typedEntries: [ShortcutKey, BookmarkID][] = []
    const keySet = new Set<ShortcutKey>()
    const bookmarkSet = new Set<BookmarkID>()
    for (const [key, id] of entries) {
      const sanitizedKey = shortcutKeyOf(key)
      if (!sanitizedKey || !id || keySet.has(sanitizedKey) || bookmarkSet.has(id)) {
        continue
      }
      keySet.add(sanitizedKey)
      bookmarkSet.add(id)
      typedEntries.push([sanitizedKey, id])
    }
    this.entries = typedEntries
  }

  getByBookmarkID(bookmarkID: BookmarkID): ShortcutKey | undefined {
    for (const [key, id] of this.entries) {
      if (id === bookmarkID) {
        return key
      }
    }
  }

  getByShortcutKey(shortcutKey: ShortcutKey): BookmarkID | undefined {
    for (const [key, id] of this.entries) {
      if (key === shortcutKey) {
        return id
      }
    }
  }

  set(bookmarkID: BookmarkID, key: ShortcutKey | undefined): ShortcutMap {
    if (!key) {
      return new ShortcutMap(this.entries.filter(([, id]) => id !== bookmarkID))
    }
    return new ShortcutMap([[key, bookmarkID], ...this.entries])
  }

  serialize = (): readonly [string, string][] => [...this.entries]
}
