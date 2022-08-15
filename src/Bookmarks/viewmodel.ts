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

export type BookmarkWithDragProps = Bookmark & {
  readonly dragFrom?: true
  readonly dragTo?: true
}

export const reorderBookmarks = (
  drag: Drag | undefined,
  folderID: BookmarkFolderID,
  bookmarks: readonly Bookmark[]
): readonly BookmarkWithDragProps[] => {
  if (!drag) {
    return bookmarks
  }

  if (folderID === drag.from.folderID && drag.from.folderID === drag.to.folderID) {
    // move the bookmark in the folder
    const r: BookmarkWithDragProps[] = [...bookmarks]
    r.splice(drag.from.index, 1)
    r.splice(drag.to.index, 0, { ...drag.bookmark, dragFrom: true, dragTo: true })
    return r
  }

  const r: BookmarkWithDragProps[] = [...bookmarks]
  if (folderID === drag.from.folderID) {
    // when move across the folder, keep the element to receive the dragEnd event
    r[drag.from.index] = { ...drag.bookmark, dragFrom: true }
  }
  if (folderID === drag.to.folderID) {
    r.splice(drag.to.index, 0, { ...drag.bookmark, dragTo: true })
  }
  return r
}
