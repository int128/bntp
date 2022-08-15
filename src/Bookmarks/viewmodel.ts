import { Bookmark, BookmarkFolderID, Position } from './model'

export class Drag {
  readonly bookmark: Bookmark
  readonly from: Position
  readonly to: Position

  private constructor(bookmark: Bookmark, from: Position, to: Position) {
    this.bookmark = bookmark
    this.from = from
    this.to = to
  }

  static start(bookmark: Bookmark, from: Position): Drag {
    return new Drag(bookmark, from, from)
  }

  moveTo(to: Position): Drag {
    return new Drag(this.bookmark, this.from, to)
  }

  calculateDestination(): Position {
    // https://stackoverflow.com/questions/13264060/chrome-bookmarks-api-using-move-to-reorder-bookmarks-in-the-same-folder
    if (this.from.folderID === this.to.folderID && this.from.index < this.to.index) {
      return { ...this.to, index: this.to.index + 1 }
    }
    return this.to
  }
}

export const reorderBookmarks = (
  drag: Drag | undefined,
  folderID: BookmarkFolderID,
  bookmarks: readonly Bookmark[]
): readonly Bookmark[] => {
  if (!drag) {
    return bookmarks
  }

  const ordered = [...bookmarks]
  if (folderID === drag.from.folderID) {
    ordered.splice(drag.from.index, 1)
  }
  if (folderID === drag.to.folderID) {
    ordered.splice(drag.to.index, 0, drag.bookmark)
  }
  return ordered
}
