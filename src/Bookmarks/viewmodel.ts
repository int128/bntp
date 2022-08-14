import { Bookmark, BookmarkPosition } from './model'

export class Drag {
  readonly source: Bookmark
  readonly position: BookmarkPosition

  constructor(source: Bookmark, position?: BookmarkPosition) {
    this.source = source
    this.position = position ?? new BookmarkPosition(source.folderID, source.index)
  }

  moveDropTo(p: BookmarkPosition): Drag {
    if (this.position.equals(p)) {
      return new Drag(this.source, new BookmarkPosition(p.folderID, p.index - 1))
    }
    return new Drag(this.source, new BookmarkPosition(p.folderID, p.index + 1))
  }
}

export class Drop {}

export const insertDrop = (
  bookmarks: readonly Bookmark[],
  position?: BookmarkPosition
): readonly (Bookmark | Drop)[] => {
  if (!position) {
    return bookmarks
  }
  if (bookmarks.length === 0) {
    return bookmarks
  }
  if (position.folderID !== bookmarks[0].folderID) {
    return bookmarks
  }

  const bookmarksWithDropTarget: (Bookmark | Drop)[] = [...bookmarks]
  bookmarksWithDropTarget.splice(position.index + 1, 0, new Drop())
  return bookmarksWithDropTarget
}
