import { Bookmark, BookmarkFolderID, Position } from './model'

export class Drag {
  readonly bookmark: Bookmark
  readonly from: Position
  readonly to: Position
  readonly hover: boolean

  private constructor(bookmark: Bookmark, from: Position, to: Position, hover: boolean) {
    this.bookmark = bookmark
    this.from = from
    this.to = to
    this.hover = hover
  }

  static start(bookmark: Bookmark, from: Position) {
    return new Drag(bookmark, from, from, true)
  }

  enterTo(to: Position) {
    return new Drag(this.bookmark, this.from, to, true)
  }

  leave() {
    return new Drag(this.bookmark, this.from, this.to, false)
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
  readonly hover?: true
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
    r.splice(drag.to.index, 0, { ...drag.bookmark, dragFrom: true, dragTo: true, hover: drag.hover || undefined })
    return r
  }

  const r: BookmarkWithDragProps[] = [...bookmarks]
  if (folderID === drag.from.folderID) {
    // when move across the folder, keep the element to receive the dragEnd event
    r[drag.from.index] = { ...drag.bookmark, dragFrom: true }
  }
  if (folderID === drag.to.folderID) {
    r.splice(drag.to.index, 0, { ...drag.bookmark, dragTo: true, hover: drag.hover || undefined })
  }
  return r
}
