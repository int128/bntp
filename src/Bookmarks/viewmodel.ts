import { Bookmark, BookmarkFolderID } from './model'

export type Drag = {
  source: Bookmark
  destination: {
    folderID: BookmarkFolderID
    index: number
  }
}

export class DropTarget {}

export const insertDropTarget = (bookmarks: readonly Bookmark[], drag: Drag): readonly (Bookmark | DropTarget)[] => {
  const bookmarksWithDropTarget: (Bookmark | DropTarget)[] = [...bookmarks]
  bookmarksWithDropTarget.splice(drag.destination.index + 1, 0, new DropTarget())
  return bookmarksWithDropTarget
}
